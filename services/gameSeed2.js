// const mongoose = require('mongoose');
// const Game = require('../models/games');
// // const db = require('../models');
// const Sport = require('../models/sport');
// const Slip = require('../models/betSlip');
// const axios = require('axios');
// const cron = require('node-cron');


// // base url "https://odds.p.rapidapi.com/v4/sports/?rapidapi-key="
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// ).then(async () => {
//   console.log("connected")
//   const getGames = async () => {
//     const leagueRelations = {
//       'MLB': 'Baseball',
//       'NCAA Basketball': 'Basketball',
//       'NBA': 'Basketball',
//       'NCAA Football': 'Football',
//       'NHL': 'Hockey',
//       'NFL': 'Football',
//       'PGA': 'Golf',
//       'LPGA': 'Golf',
//       'Fed-Ex 500 Events': 'Golf',
//       'Champions Tour': 'Golf',
//       'UFC': 'Martial Arts',
//       'ATP': 'Tennis',
//       'WTA': 'Tennis',
//       'England - Premier League': 'Soccer',
//       'EPL': 'Soccer',
//       'Germany - Bundesliga': 'Soccer',
//       'Bundesliga': 'Soccer',
//       'La Liga': 'Soccer',
//       'Liga': 'Soccer',
//       'France': 'Soccer',
//       'Ligue 1': 'Soccer',
//     }

//     const getMLB = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getNBA = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getNCAABasketball = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getNCAAFootball = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getNFL = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getPGA = async () => {
//       return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/golf/golf?api-key=5afca6d81396efe5c27658dfc7800a84`)
//     }

//     const getNHL = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)    
//     }

//     const getMMA = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/mma_mixed_martial_arts/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getEPL = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getLigue = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getBundesliga = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)    
//     }

//     const getLaLiga = async () => {
//       return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`)
//     }

//     const getATP = async () => {
//       // return axios.get(`https://betonline-tennis-atp.datafeeds.net/api/json/odds/v2/tennis/atp?api-key=5afca6d81396efe5c27658dfc7800a84`)
//       return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/atp?api-key=5afca6d81396efe5c27658dfc7800a84`)
//     }

//     const getWTA = async () => {
//       // return axios.get(`https://betonline-tennis-wta.datafeeds.net/api/json/odds/v2/tennis/wta?api-key=5afca6d81396efe5c27658dfc7800a84`)
//       return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/wta?api-key=5afca6d81396efe5c27658dfc7800a84`)
//     }

//     // await Promise.all([getMLB(), getNBA(), getNCAABasketball(), getNCAAFootball(), getNFL(), getPGA(), getNHL(), getMMA(), getEPL(), getLigue(), getBundesliga(), getLaLiga(), getATP(), getWTA()])
//     // await Promise.all([getMLB(), getNBA(), getNHL(), getMMA(), getEPL(), getATP(), getWTA()])
//     await Promise.all([getNFL(), getNBA(), getNCAABasketball(), getNCAAFootball(), getNHL()])
//       .then(data => {
//         const gamesObj = {
//           // MLB: data[0].data.games,
//           NBA: data[1].data.games,
//           NCAABasketball: data[2].data.games,
//           NCAAFootball: data[3].data.games,
//           NFL: data[0].data,
//           // // PGA: data[5].data.games,
//           NHL: data[4].data.games,
//           // // MMA: data[7].data.games,
//           // // EPL: data[4].data.games,
//           // // Ligue: data[9].data.games,
//           // // Bundesliga: data[10].data.games,
//           // // Liga: data[11].data.games,
//           // ATP: data[5].data.games,
//           // WTA: data[6].data.games
//         }

//         const entries = Object.entries(gamesObj).map(async (sport, index) => {
//           const findSport = await Sport.findOne(
//             {
//               sportTitle: leagueRelations[`${ sport[0] }`],
//             }, async (err, doc) => {
//               if (Object.values(sport[1]).length < 1) {
//                 if (doc.leagues[`${ sport[0] }`].games.active === true) {
//                   await Sport.findOneAndUpdate(
//                     { sportTitle: leagueRelations[`${ sport[0] }`] },
//                     {
//                       $set: {
//                         'prevStatus': doc.active,
//                         [`leagues.${ sport[0] }.games.active`]: false,
//                         "active": false,
//                         "date": Date.now()
//                       }
//                     },
//                     {
//                       new: true
//                     }
//                   )
//                 }
//               } else {
//                 if (doc.leagues[`${ sport[0] }`].games.active === false) {
//                   await Sport.findOneAndUpdate(
//                     { sportTitle: leagueRelations[`${ sport[0] }`] },
//                     {
//                       $set: {
//                         'prevStatus': doc.active,
//                         [`leagues.${ sport[0] }.games.active`]: true,
//                         "active": true,
//                         "statusChange": true,
//                         "dateStatusChange": Date.now(),
//                         "dateReset": parseFloat(Date.now()) + 90000,
//                         "date": Date.now()
//                       }
//                     },
//                     {
//                       new: true
//                     }
//                   )
//                 }

//                 const promise = await Object.values(sport[1]).map(async (game, index) => {
//                   console.log(game.bookmakers[0].markets[2])
//                   const updateGame = await Game.find(
//                     {
//                       gameUID: game.id
//                     }, async (err, doc) => {
//                       if (doc.length > 0) {
//                         await Game.findOneAndUpdate(
//                           { gameUID: game.id },
//                           {
//                             $set: {
//                               "sport": leagueRelations[`${ game.sport_title }`],
//                               "league": game.sport_title,
//                               "startDate": game.commence_time,
//                               "awayTeam": game.away_team,
//                               "homeTeam": game.home_team,
//                               "game.odds.full": game,
//                               "game.odds.keys": {
//                                 "gameMoneylineAwayID": `${ game.id }-1`,
//                                 "gameSpreadAwayID": `${ game.id }-2`,
//                                 "gameTotalOverID": `${ game.id }-3`,
//                                 "gameMoneylineHomeID": `${ game.id }-4`,
//                                 "gameSpreadHomeID": `${ game.id }-5`,
//                                 "gameTotalUnderID": `${ game.id }-6`,
//                               },
//                               "game.keys.gameMoneylineAway.id": `${ game.id }-1`,
//                               "game.keys.gameMoneylineAway.currVal": game.bookmakers[0].markets[0].outcomes[0].price,
//                               "game.keys.gameMoneylineAway.prevVal": doc[0].game.keys.gameMoneylineAway.currVal,
//                               "game.keys.gameSpreadAway.id": `${ game.id }-2`,
//                               "game.keys.gameSpreadAway.currVal": game.bookmakers[0].markets[1].outcomes[0].point,
//                               "game.keys.gameSpreadAway.prevVal": doc[0].game.keys.gameSpreadAway.currVal,
//                               "game.keys.gameTotalOver.id": `${ game.id}-3`,
//                               "game.keys.gameTotalOver.currVal": game.bookmakers[0].markets[2].outcomes[0].point,
//                               "game.keys.gameTotalOver.prevVal": doc[0].game.keys.gameTotalOver.currVal,
//                               "game.keys.gameMoneylineHome.id": `${ game.id }-4`,
//                               "game.keys.gameMoneylineHome.currVal": game.bookmakers[0].markets[0].outcomes[1].price,
//                               "game.keys.gameMoneylineHome.prevVal": doc[0].game.keys.gameMoneylineHome.currVal,
//                               "game.keys.gameSpreadHome.id": `${ game.id }-5`,
//                               "game.keys.gameSpreadHome.currVal": game.bookmakers[0].markets[1].outcomes[1].point,
//                               "game.keys.gameSpreadHome.prevVal": doc[0].game.keys.gameSpreadHome.currVal,
//                               "game.keys.gameTotalUnder.id": `${ game.id }-6`,
//                               "game.keys.gameTotalUnder.currVal": game.game.bookmakers[0].markets[2].outcomes[1].point,
//                               "game.keys.gameTotalUnder.prevVal": doc[0].game.keys.gameTotalUnder.currVal,
//                             },
//                           },
//                           {
//                             new: true
//                           }
//                         )
//                       } else {
//                         await Game.findOneAndUpdate(
//                           { gameUID: game.id },
//                           {
//                             $set: {
//                               "sport": leagueRelations[`${ game.sport_title }`],
//                               "league": game.sport_title,
//                               "startDate": game.commence_time,
//                               "awayTeam": game.away_team,
//                               "homeTeam": game.home_team,
//                               "game.odds.full": game,
//                               "game.odds.keys": {
//                                 "gameMoneylineAwayID": `${ game.id }-1`,
//                                 "gameSpreadAwayID": `${ game.id }-2`,
//                                 "gameTotalOverID": `${ game.id }-3`,
//                                 "gameMoneylineHomeID": `${ game.id }-4`,
//                                 "gameSpreadHomeID": `${ game.id }-5`,
//                                 "gameTotalUnderID": `${ game.id }-6`,
//                               },
//                               "game.keys": {
//                                 "gameMoneylineAway": {
//                                   'id': `${ game.id }-1`,
//                                   'initialVal': game.bookmakers[0].markets[0].outcomes[0].price,
//                                   'prevVal': game.bookmakers[0].markets[0].outcomes[0].price,
//                                   'currVal': game.bookmakers[0].markets[0].outcomes[0].price,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                                 "gameSpreadAway": {
//                                   'id': `${ game.id }-2`,
//                                   'initialVal': game.bookmakers[0].markets[1].outcomes[0].point,
//                                   'prevVal': game.bookmakers[0].markets[1].outcomes[0].point,
//                                   'currVal': game.bookmakers[0].markets[1].outcomes[0].point,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                                 "gameTotalOver": {
//                                   'id': `${ game.id }-3`,
//                                   'initialVal': game.bookmakers[0].markets[2].outcomes[0].point,
//                                   'prevVal': game.bookmakers[0].markets[2].outcomes[0].point,
//                                   'currVal': game.bookmakers[0].markets[2].outcomes[0].point,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                                 "gameMoneylineHome": {
//                                   'id': `${ game.id }-4`,
//                                   'initialVal': game.bookmakers[0].markets[0].outcomes[1].price,
//                                   'prevVal': game.bookmakers[0].markets[0].outcomes[1].price,
//                                   'currVal': game.bookmakers[0].markets[0].outcomes[1].price,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                                 "gameSpreadHome": {
//                                   'id': `${ game.id }-5`,
//                                   'initialVal': game.bookmakers[0].markets[1].outcomes[1].point,
//                                   'prevVal': game.bookmakers[0].markets[1].outcomes[1].point,
//                                   'currVal': game.bookmakers[0].markets[1].outcomes[1].point,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                                 "gameTotalUnder": {
//                                   'id': `${ game.id }-6`,
//                                   'initialVal': game.bookmakers[0].markets[2].outcomes[1].point,
//                                   'prevVal': game.bookmakers[0].markets[2].outcomes[1].point,
//                                   'currVal': game.bookmakers[0].markets[2].outcomes[1].point,
//                                   'totalDelta': '0',
//                                   'currDelta': '0',
//                                   'deltaOperator': 'none',
//                                   'lineShift': false,
//                                   'dateLineShift': '',
//                                   'dateReset': null
//                                 },
//                               }
//                             },
//                           },
//                           {
//                             upsert: true,
//                             setDefaultsOnInsert: true,
//                             new: true
//                           }
//                         )
//                       }
//                     }
//                   )
//                   await Promise.all(promise)
//                 })

//               }
//             }
//           )
//         })
//         // console.log(gamesObj)
//       })
//   }
//   getGames();

//   const updateResults = async () => {
//     let resultsArr = [];
//     let resultsObj = {};

//     const getMLBResults = () => {
//       // return axios.get(`https://mlb.cheapdatafeeds.com/api/json/scores/v1/baseball/mlb?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
//       return axios.get(
//         `https://live-scores.datafeeds.net/api/json/scores/v3/60/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84`
//       )
//     }

//     const getNBAResults = () => {
//       // return axios.get(`https://nba.cheapdatafeeds.com/api/json/scores/v1/basketball/nba?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
//       return axios.get(
//         `https://live-scores.datafeeds.net/api/json/scores/v3/60/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84`
//       )
//     }

//     const getNFLResults = () => {
//       return axios.get(
//         `https://nfl.cheapdatafeeds.com/api/json/scores/v1/football/nfl?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`
//       )
//     }

//     const getNHLResults = () => {
//       // return axios.get(`https://nhl.cheapdatafeeds.com/api/json/scores/v1/hockey/nhl?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
//       return axios.get(
//         `https://live-scores.datafeeds.net/api/json/scores/v3/60/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84`
//       );
//     }

//     const updateGamesDB = async () => {
//       const promises = Object.entries(resultsObj).map(async (sport, index) => {
//         const promises2 = await Object.values(sport[1]).map(async (game, index) => {
//           const updated = await Game.findOneAndUpdate(
//             {
//               $and: [ { gameUID: { $eq: game.gameUID  } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live']} } ]
//             },
//             {
//               $set: {
//                 "game.results.full": game,
//                 "game.results.final": {
//                   "moneylineHome": {"id": `${ game.gameUID }-4`, "value": parseInt(game.scoreHomeTotal) > parseInt(game.scoreAwayTotal)},
//                   "moneylineAway": {"id": `${ game.gameUID }-1`, "value": parseInt(game.scoreAwayTotal) > parseInt(game.scoreHomeTotal)},
//                   "homeDifference": {"id": `${ game.gameUID }-5`, "value": 0 - (parseInt(game.scoreHomeTotal) - parseInt(game.scoreAwayTotal))},
//                   "awayDifference": {"id": `${ game.gameUID }-2`, "value": 0 - (parseInt(game.scoreAwayTotal) - parseInt(game.scoreHomeTotal))},
//                   "totalOver": {"id": `${ game.gameUID }-3`, "value": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal)},
//                   "totalUnder": {"id": `${ game.gameUID }-6`, "value": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal)},
//                 },
//                 status: game.status,
//                 date: new Date().setDate(new Date().getDate()),
//               }
//             },
//             {
//               new: true,
//             }, (err, doc) => {
//               if (doc != null) {
//                 if (doc.status === 'Completed') {
//                   resultsArr.push({"gameUID": doc.gameUID,  "results": doc.game.results.final})
//                 }
//               }
//             }
//           )
//         })
//         await Promise.all(promises2)
//       })
//       await Promise.all(promises)
//       return resultsArr;
//     }

//     const updateSlipsDB = async (gameResults) => {
//       const promises = await gameResults.map(async (results) => {
//         console.log(results)

//         const updateMoneylineHome = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.moneylineHome.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.moneylineHome.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (results.results.moneylineHome.value === true) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )


//         const updateMoneylineAway = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.moneylineAway.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.moneylineAway.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (results.results.moneylineAway.value === true) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )

//         const updateSpreadAway = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.awayDifference.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.awayDifference.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.awayDifference.value) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       // [`slips.keys.${ betUID }.payout`]: `-${doc.slips.keys[`${betUID}`].toLose}`,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )

//         const updateSpreadHome = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.homeDifference.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.homeDifference.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.homeDifference.value) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )

//         const updateTotalOver = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.totalOver.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.totalOver.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (parseFloat(doc.slips.keys[`${betUID}`].line) < results.results.totalOver.value) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )

//         const updateTotalUnder = await Slip.find(
//           {
//             "betUID": { $in: [ results.results.totalUnder.id ] },
//           }, async (err, docs) => {
//             const betUID = results.results.totalUnder.id;
//             const updateDocs = await docs.map(async (doc) => {
//               if (parseFloat(doc.slips.keys[`${betUID}`].line) > results.results.totalUnder.value) {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               } else {
//                 await Slip.findOneAndUpdate(
//                   {
//                     "_id": doc._id,
//                   },
//                   {
//                     $set: {
//                       "outcome": false,
//                       [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
//                       [`slips.keys.${ betUID }.status`]: "Completed",
//                     },
//                     $inc: {
//                       "quantity.completed": 1
//                     }
//                   },
//                   {
//                     new: true
//                   }
//                 )
//               }
//             })
//             await Promise.all(updateDocs)
//           }
//         )
//       })
//       await Promise.all(promises);
//     }

//     await Promise.all([getMLBResults(), getNBAResults(), getNFLResults(), getNHLResults()])
//       .then((data) => {
//         resultsObj = {
//             // MLB: data[0].data.games,
//             // NBA: data[1].data.games,
//             // NFL: data[2].data.games,
//             NHL: data[3].data.games
//         }
//       })

//     await Promise.all([updateGamesDB()])
//       .then((data) => {
//         // console.log(data[0])
//       })

//     if (resultsArr.length > 0) {
//       await Promise.all([updateSlipsDB(resultsArr)])
//     }
//   }
//   updateResults()
// })
