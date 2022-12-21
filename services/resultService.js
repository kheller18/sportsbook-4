const mongoose = require('mongoose');
const Game = require('../models/games');
// const Sport = require('../models/sport');
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
        `https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNBAResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_nba/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNFLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNCAAFootballResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNCAABasketballResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getNHLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const getMMAResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/mma_mixed_martial_arts/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getEPLResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_epl/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getLigueResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const getBundesligaResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      )
    }

    const getLaLigaResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/scores?rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const updateGamesDB = async () => {
      const promises = Object.entries(resultsObj).map(async (sport, index) => {
        const promises2 = await Object.values(sport[1]).map(async (game, index) => {
          const updated = await Game.findOneAndUpdate(
            {
              $and: [ { gameUID: { $eq: game.gameUID  } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live']} } ]
            },
            {
              $set: {
                "game.results.full": game,
                "game.results.final": {
                  "moneylineHome": {"id": `${ game.gameUID }-4`, "value": parseInt(game.scoreHomeTotal) > parseInt(game.scoreAwayTotal)},
                  "moneylineAway": {"id": `${ game.gameUID }-1`, "value": parseInt(game.scoreAwayTotal) > parseInt(game.scoreHomeTotal)},
                  "homeDifference": {"id": `${ game.gameUID }-5`, "value": 0 - (parseInt(game.scoreHomeTotal) - parseInt(game.scoreAwayTotal))},
                  "awayDifference": {"id": `${ game.gameUID }-2`, "value": 0 - (parseInt(game.scoreAwayTotal) - parseInt(game.scoreHomeTotal))},
                  "totalOver": {"id": `${ game.gameUID }-3`, "value": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal)},
                  "totalUnder": {"id": `${ game.gameUID }-6`, "value": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal)},
                },
                status: game.status,
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
        })
        await Promise.all(promises2)
      })
      await Promise.all(promises)
      return resultsArr;
    }

    const updateSlipsDB = async (gameResults) => {
      const promises = await gameResults.map(async (results) => {
        console.log(results)

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

    await Promise.all([getMLBResults(), getNBAResults(), getNFLResults(), getNHLResults()])
      .then((data) => {
        resultsObj = {
            // MLB: data[0].data.games,
            // NBA: data[1].data.games,
            // NFL: data[2].data.games,
            NHL: data[3].data
        }
      })

    await Promise.all([updateGamesDB()])
      .then((data) => {
        // console.log(data[0])
      })

    if (resultsArr.length > 0) {
      await Promise.all([updateSlipsDB(resultsArr)]);
    }
  }
  updateResults();
})
