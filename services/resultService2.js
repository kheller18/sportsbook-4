const mongoose = require('mongoose');
const Game = require('../models/games');
const Slip = require('../models/betSlip');
const User = require('../models/user');
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
  // runs ever 12.02 hours
  setInterval(() => updateResults(), 43300000)

    // function to continually update database with results information
    // const scheduleTask = cron.schedule('45 * * * *', async () => {
    //   console.log(new Date())
    //   console.log('results')
    //   await updateResults();
    // })

  const updateResults = async () => {
    let resultsArr = [];
    let resultsObj = {};
    let update_accounts = [];
    console.log('update results')

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

    const getSerieResults = () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_italy_serie_a/scores?daysFrom=1&rapidapi-key=${process.env.REACT_APP_API_KEY}`
      );
    }

    const updateGamesDB = async () => {
      const promises = Object.entries(resultsObj).map(async (sport, index) => {
        console.log(sport[0])
        const promises2 = await Object.values(sport[1]).map(async (game, index) => {
          if (game.scores === null) {
          } else {
            if (sport[0] !== 'Soccer') {
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
            } else {
              const updated = await Game.findOneAndUpdate(
                {
                  $and: [ { gameUID: { $eq: game.id } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live', null] } } ]
                },
                {
                  $set: {
                    "game.results.full": game,
                    "game.results.final": {
                      "tie": {"id": `${ game.id }-0`, "value": parseInt(game.scores[0].score) = parseInt(game.scores[1].score)},
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
          }
        })
        await Promise.all(promises2)
      })
      await Promise.all(promises)
      return resultsArr;
    }

    const updateSlipsDB = async (gameResults) => {
      const update_users = [];

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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs)
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateMoneylineHome);
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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs)
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateMoneylineAway);
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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      // [`slips.keys.${ betUID }.payout`]: `-${doc.slips.keys[`${betUID}`].toLose}`,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs)
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateSpreadAway);
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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs)
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateSpreadHome);
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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs);
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateTotalOver);
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
                  { "_id": doc._id },
                  {
                    $set: {
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              } else {
                await Slip.findOneAndUpdate(
                  { "_id": doc._id },
                  {
                    $set: {
                      "outcome": false,
                      [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                      [`slips.keys.${ betUID }.status`]: "Completed",
                    },
                    $inc: { "quantity.completed": 1 }
                  },
                  { new: true },
                  (err, doc) => {if (doc.status === "Completed") {
                    update_users.push(doc)
                  }}
                )
              }
              return doc;
            })
            await Promise.all(updateDocs);
            return updateDocs;
            // console.log(updateDocs);
            // console.log(updateTotalUnder);
          }
        )

        if (results.sport === 'Soccer') {
          const updateTie = await Slip.find(
            {
              "betUID": { $in: [ results.results.tie.id ] },
            }, async (err, docs) => {
              const betUID = results.results.tie.id;
              const updateDocs = await docs.map(async (doc) => {
                if (results.results.tie.value === true) {
                  await Slip.findOneAndUpdate(
                    { "_id": doc._id },
                    {
                      $set: {
                        [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
                        [`slips.keys.${ betUID }.status`]: "Completed",
                      },
                      $inc: { "quantity.completed": 1 }
                    },
                    { new: true },
                    (err, doc) => {if (doc.status === "Completed") {
                      update_users.push(doc)
                    }}
                  )
                } else {
                  await Slip.findOneAndUpdate(
                    { "_id": doc._id },
                    {
                      $set: {
                        "outcome": false,
                        [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
                        [`slips.keys.${ betUID }.status`]: "Completed",
                      },
                      $inc: { "quantity.completed": 1 }
                    },
                    { new: true },
                    (err, doc) => {if (doc.status === "Completed") {
                      update_users.push(doc)
                    }}
                  )
                }
                return doc;
              })
              await Promise.all(updateDocs);
              return updateDocs;
              // console.log(updateDocs);
              // console.log(updateTotalUnder);
            }
          )
        }

      })
      await Promise.all(promises);
      return update_users;
    }

    const updateAccounts = async (slips) => {
      const promises = await slips.map(async (slip) => {
        const updateAccount = await User.findOneAndUpdate(
          { "user_id": slip.userID },
          {
            $push: { account_value_history: { date: Date.now(), outcome: slip.payout.final } },
            // $sum: { accountValue: [parseFloat(slip.payout.final), "$accountValue"] }
          },
          { new: true }
        )
        // console.log(account);
      })
      await Promise.all(promises)
    }

    await new Promise(r => setTimeout(r, 4000));
    let resultsObj2 = {}
    await Promise.all([getEPLResults(), getLigueResults(), getBundesligaResults(), getLaLigaResults()])
    .then((data) => {
      resultsObj2 = {
          'EPL': data[0].data,
          'Ligue 1 - France': data[1].data,
          'Bundesliga - Germany': data[2].data,
          'La Liga - Spain': data[3].data,
      }
    })

    await new Promise(r => setTimeout(r, 1500));
    await Promise.all([getNBAResults(), getNFLResults(), getNHLResults(), getSerieResults()])
      .then((data) => {
        resultsObj = {
            'NBA': data[0].data,
            'NFL': data[1].data,
            'NHL': data[2].data,
            'Serie A - Italy': data[3].data,
            'EPL': resultsObj2['EPL'],
            'Ligue 1 - France': resultsObj2['Ligue 1 - France'],
            'Bundesliga - Germany': resultsObj2['Bundesliga - Germany'],
            'La Liga - Spain': resultsObj2['La Liga - Spain']
        }
      })

    await Promise.all([updateGamesDB()])
      .then((data) => {
        // console.log(data)
      })

    if (resultsArr.length > 0) {
      await Promise.all([updateSlipsDB(resultsArr)]).then((data) => {
        // console.log(data)
        update_accounts = data[0];
      }).catch((err) => {
        console.log(err);
      });
    }

    if (update_accounts.length > 0) {
      await updateAccounts(update_accounts)
    }
  }

  updateResults();
})
