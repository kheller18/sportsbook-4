const mongoose = require('mongoose');
const Game = require('../models/games');
const Slip = require('../models/betSlip');
const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(async () => {

  const updateResults = async () => {
    let resultsArr = [];
    let resultsObj = {};

    const getMLBResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNBAResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNFLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNCAAFootballResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNCAABasketballResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNHLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const getMMAResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/mma_mixed_martial_arts/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getEPLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_epl/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getLigueResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const getBundesligaResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getLaLigaResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const updateGamesDB = async () => {
      const promises = Object.entries(resultsObj).map(async (sport, index) => {
        const promises2 = await Object.values(sport[1]).map(async (game, index) => {
          // console.log(game)
          if (game.scores === null) {
          } else {
            const updated = await Game.findOneAndUpdate(
              {
                $and: [ { gameUID: { $eq: game.id } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live', null] } } ]
              },
              {
                $set: {
                  "game.results.full": game,
                  "game.results.final": {
                    "moneylineHome": {"id": `${ game.id }-4`, "value": parseInt(game.scores[0].score) > parseInt(game.scores[1].score)},
                    "moneylineAway": {"id": `${ game.id }-1`, "value": parseInt(game.scores[1].score) > parseInt(game.scores[0].score)},
                    "homeDifference": {"id": `${ game.id }-5`, "value": 0 - (parseInt(game.scores[0].score) - parseInt(game.scores[1].score))},
                    "awayDifference": {"id": `${ game.id }-2`, "value": 0 - (parseInt(game.scores[1].score) - parseInt(game.scores[0].score))},
                    "totalOver": {"id": `${ game.id }-3`, "value": parseInt(game.scores[1].score) + parseInt(game.scores[0].score)},
                    "totalUnder": {"id": `${ game.id }-6`, "value": parseInt(game.scores[1].score) + parseInt(game.scores[0].score)},
                  },
                  status: (game.completed === false) ? 'Live' : 'Completed',
                  date: new Date().setDate(new Date().getDate()),
                }
              },
              {
                new: true,
              }, (err, doc) => {
                if (doc != null) {
                  if (doc.status === 'Completed') {
                    resultsArr.push({"gameUID": doc.gameUID,  "results": doc.game.results.final})
                  }
                }
              }
            )
          }
        })
        await Promise.all(promises2)
      })
      await Promise.all(promises)
      return resultsArr;
    }

    const updateSlipsDB = async (gameResults) => {
      const promises = await gameResults.map(async (results) => {
        // console.log(results)

        const updateMoneylineHome = await Slip.find(
          {
            "betUID": { $in: [ results.results.moneylineHome.id ] },
          }, async (err, docs) => {
            const betUID = results.results.moneylineHome.id;
            const updateDocs = await docs.map(async (doc) => {
              if (results.results.moneylineHome.value === true) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs)
          }
        )

        const updateMoneylineAway = await Slip.find(
          {
            "betUID": { $in: [ results.results.moneylineAway.id ] },
          }, async (err, docs) => {
            const betUID = results.results.moneylineAway.id;
            const updateDocs = await docs.map(async (doc) => {
              if (results.results.moneylineAway.value === true) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs)
          }
        )

        const updateSpreadAway = await Slip.find(
          {
            "betUID": { $in: [ results.results.awayDifference.id ] },
          }, async (err, docs) => {
            const betUID = results.results.awayDifference.id;
            const updateDocs = await docs.map(async (doc) => {
              if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.awayDifference.value) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      // [`slips.keys.${ betUID }.payout`]: `-${doc.slips.keys[`${betUID}`].toLose}`,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs)
          }
        )

        const updateSpreadHome = await Slip.find(
          {
            "betUID": { $in: [ results.results.homeDifference.id ] },
          }, async (err, docs) => {
            const betUID = results.results.homeDifference.id;
            const updateDocs = await docs.map(async (doc) => {
              if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.homeDifference.value) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs)
          }
        )

        const updateTotalOver = await Slip.find(
          {
            "betUID": { $in: [ results.results.totalOver.id ] },
          }, async (err, docs) => {
            const betUID = results.results.totalOver.id;
            const updateDocs = await docs.map(async (doc) => {
              if (parseFloat(doc.slips.keys[`${betUID}`].line) < results.results.totalOver.value) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs);
          }
        )

        const updateTotalUnder = await Slip.find(
          {
            "betUID": { $in: [ results.results.totalUnder.id ] },
          }, async (err, docs) => {
            const betUID = results.results.totalUnder.id;
            const updateDocs = await docs.map(async (doc) => {
              if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.totalUnder.value) {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              } else {
                await Slip.findOneAndUpdate(
                  {
                    "_id": doc._id,
                  },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: {
                      "quantity.completed": 1
                    }
                  },
                  {
                    new: true
                  }
                )
              }
            })
            await Promise.all(updateDocs);
          }
        )
      })
      await Promise.all(promises);
    }

    await Promise.all([getNBAResults()])
      .then((data) => {
        resultsObj = {
            // MLB: data[0].data.games,
            NBA: data[0].data,
            // NFL: data[2].data.games,
            // NHL: data[3].data
        }
      })

    await Promise.all([updateGamesDB()])
      .then((data) => {
        console.log(data)
      })

    if (resultsArr.length > 0) {
      await Promise.all([updateSlipsDB(resultsArr)]);
    }
  }
  // updateResults();
})
