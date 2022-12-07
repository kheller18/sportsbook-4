const mongoose = require('mongoose');
const Game = require('../models/games');
// const db = require('../models');
const Sport = require('../models/sport');
const Slip = require('../models/betSlip');
const axios = require('axios');
const cron = require('node-cron');


// base url "https://odds.p.rapidapi.com/v4/sports/?rapidapi-key="
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(async () => {
  console.log("connected")
  const getGames = async () => {
    const leagueRelations = {
      'MLB': 'Baseball',
      'NCAA Basketball': 'Basketball',
      'NBA': 'Basketball',
      'NCAA Football': 'Football',
      'NHL': 'Hockey',
      'NFL': 'Football',
      'PGA': 'Golf',
      'LPGA': 'Golf',
      'Fed-Ex 500 Events': 'Golf',
      'Champions Tour': 'Golf',
      'UFC': 'Martial Arts',
      'ATP': 'Tennis',
      'WTA': 'Tennis',
      'England - Premier League': 'Soccer',
      'EPL': 'Soccer',
      'Germany - Bundesliga': 'Soccer',
      'Bundesliga': 'Soccer',
      'La Liga': 'Soccer',
      'Liga': 'Soccer',
      'France': 'Soccer',
      'Ligue 1': 'Soccer',
    }

    const getMLB = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getNBA = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getNCAABasketball = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getNCAAFootball = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getNFL = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getPGA = async () => {
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/golf/golf?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNHL = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getMMA = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/mma_mixed_martial_arts/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getEPL = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getLigue = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getBundesliga = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getLaLiga = async () => {
      return axios.get(`https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/odds/?rapidapi-key=10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c&markets=h2h,spreads,totals&regions=us&oddsFormat=american`)
    }

    const getATP = async () => {
      // return axios.get(`https://betonline-tennis-atp.datafeeds.net/api/json/odds/v2/tennis/atp?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/atp?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getWTA = async () => {
      // return axios.get(`https://betonline-tennis-wta.datafeeds.net/api/json/odds/v2/tennis/wta?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/wta?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    // await Promise.all([getMLB(), getNBA(), getNCAABasketball(), getNCAAFootball(), getNFL(), getPGA(), getNHL(), getMMA(), getEPL(), getLigue(), getBundesliga(), getLaLiga(), getATP(), getWTA()])
    // await Promise.all([getMLB(), getNBA(), getNHL(), getMMA(), getEPL(), getATP(), getWTA()])
    await Promise.all([getNFL()])
      .then(data => {
        // const gamesObj = {
        //   // MLB: data[0].data.games,
        //   // NBA: data[1].data.games,
        //   // NCAABasketball: data[2].data.games,
        //   // NCAAFootball: data[3].data.games,
        //   // NFL: data[4].data.games,
        //   // PGA: data[5].data.games,
        //   NHL: data[6].data.games,
        //   // MMA: data[7].data.games,
        //   // EPL: data[8].data.games,
        //   // Ligue: data[9].data.games,
        //   // Bundesliga: data[10].data.games,
        //   // Liga: data[11].data.games,
        //   // ATP: data[12].data.games,
        //   // WTA: data[13].data.games
        // }
        console.log(data[0].data)
        const gamesObj = {
          // MLB: data[0].data.games,
          // NBA: data[1].data.games,
          // // NCAABasketball: data[2].data.games,
          // NCAAFootball: data[3].data.games,
          NFL: data[0].data.games,
          // // PGA: data[5].data.games,
          // NHL: data[2].data.games,
          // // MMA: data[7].data.games,
          // // EPL: data[4].data.games,
          // // Ligue: data[9].data.games,
          // // Bundesliga: data[10].data.games,
          // // Liga: data[11].data.games,
          // ATP: data[5].data.games,
          // WTA: data[6].data.games
        }

        const entries = Object.entries(gamesObj).map(async (sport, index) => {
          const findSport = await Sport.findOne(
            {
              sportTitle: leagueRelations[`${ sport[0] }`],
              // [`leagues.${ leagueRelations[`${ sport[0] }`].games.active }`]: false
            }, async (err, doc) => {
              if (Object.values(sport[1]).length < 1) {
                if (doc.leagues[`${ sport[0] }`].games.active === true) {
                  await Sport.findOneAndUpdate(
                    { sportTitle: leagueRelations[`${ sport[0] }`] },
                    {
                      $set: {
                        'prevStatus': doc.active,
                        [`leagues.${ sport[0] }.games.active`]: false,
                        "active": false,
                        "date": Date.now()
                      }
                    },
                    {
                      new: true
                    }
                  )
                }
              } else {
                if (doc.leagues[`${ sport[0] }`].games.active === false) {
                  await Sport.findOneAndUpdate(
                    { sportTitle: leagueRelations[`${ sport[0] }`] },
                    {
                      $set: {
                        'prevStatus': doc.active,
                        [`leagues.${ sport[0] }.games.active`]: true,
                        "active": true,
                        "statusChange": true,
                        "dateStatusChange": Date.now(),
                        "dateReset": parseFloat(Date.now()) + 90000,
                        "date": Date.now()
                      }
                    },
                    {
                      new: true
                    }
                  )
                }

                const promise = await Object.values(sport[1]).map(async (game, index) => {
                  const updateGame = await Game.find(
                    {
                      gameUID: game.gameUID
                    }, async (err, doc) => {
                      if (doc.length > 0) {
                        await Game.findOneAndUpdate(
                          { gameUID: game.gameUID },
                          {
                            $set: {
                              "sport": game.sport,
                              "league": game.league,
                              "startDate": game.startDate,
                              "awayTeam": game.awayTeam,
                              "homeTeam": game.homeTeam,
                              "game.odds.full": game,
                              "game.odds.keys": {
                                "gameMoneylineAwayID": `${ game.gameUID }-1`,
                                "gameSpreadAwayID": `${ game.gameUID }-2`,
                                "gameTotalOverID": `${ game.gameUID }-3`,
                                "gameMoneylineHomeID": `${ game.gameUID }-4`,
                                "gameSpreadHomeID": `${ game.gameUID }-5`,
                                "gameTotalUnderID": `${ game.gameUID }-6`,
                              },
                              "game.keys.gameMoneylineAway.id": `${ game.gameUID }-1`,
                              "game.keys.gameMoneylineAway.currVal": game.gameMoneylineAwayPrice,
                              "game.keys.gameMoneylineAway.prevVal": doc[0].game.keys.gameMoneylineAway.currVal,
                              "game.keys.gameSpreadAway.id": `${ game.gameUID }-2`,
                              "game.keys.gameSpreadAway.currVal": game.gameSpreadAwayHandicap,
                              "game.keys.gameSpreadAway.prevVal": doc[0].game.keys.gameSpreadAway.currVal,
                              "game.keys.gameTotalOver.id": `${ game.gameUID }-3`,
                              "game.keys.gameTotalOver.currVal": game.gameTotalPoints,
                              "game.keys.gameTotalOver.prevVal": doc[0].game.keys.gameTotalOver.currVal,
                              "game.keys.gameMoneylineHome.id": `${ game.gameUID }-4`,
                              "game.keys.gameMoneylineHome.currVal": game.gameMoneylineHomePrice,
                              "game.keys.gameMoneylineHome.prevVal": doc[0].game.keys.gameMoneylineHome.currVal,
                              "game.keys.gameSpreadHome.id": `${ game.gameUID }-5`,
                              "game.keys.gameSpreadHome.currVal": game.gameSpreadHomeHandicap,
                              "game.keys.gameSpreadHome.prevVal": doc[0].game.keys.gameSpreadHome.currVal,
                              "game.keys.gameTotalUnder.id": `${ game.gameUID }-6`,
                              "game.keys.gameTotalUnder.currVal": game.gameTotalPoints,
                              "game.keys.gameTotalUnder.prevVal": doc[0].game.keys.gameTotalUnder.currVal,

                              "game.keys.halfMoneylineAway.id": `${ game.gameUID }-1-1`,
                              "game.keys.halfMoneylineAway.currVal": game.halfMoneylineAwayPrice,
                              "game.keys.halfMoneylineAway.prevVal": doc[0].game.keys.halfMoneylineAway.currVal,
                              "game.keys.halfSpreadAway.id": `${ game.gameUID }-1-2`,
                              "game.keys.halfSpreadAway.currVal": game.halfSpreadAwayHandicap,
                              "game.keys.halfSpreadAway.prevVal": doc[0].game.keys.halfSpreadAway.currVal,
                              "game.keys.halfTotalOver.id": `${ game.gameUID }-1-3`,
                              "game.keys.halfTotalOver.currVal": game.halfTotalPoints,
                              "game.keys.halfTotalOver.prevVal": doc[0].game.keys.halfTotalOver.currVal,
                              "game.keys.halfMoneylineHome.id": `${ game.gameUID }-1-4`,
                              "game.keys.halfMoneylineHome.currVal": game.halfMoneylineHomePrice,
                              "game.keys.halfMoneylineHome.prevVal": doc[0].game.keys.halfMoneylineHome.currVal,
                              "game.keys.halfSpreadHome.id": `${ game.gameUID }-1-5`,
                              "game.keys.halfSpreadHome.currVal": game.halfSpreadHomeHandicap,
                              "game.keys.halfSpreadHome.prevVal": doc[0].game.keys.halfSpreadHome.currVal,
                              "game.keys.halfTotalUnder.id": `${ game.gameUID }-1-6`,
                              "game.keys.halfTotalUnder.currVal": game.halfTotalPoints,
                              "game.keys.halfTotalUnder.prevVal": doc[0].game.keys.halfTotalUnder.currVal,
                            },
                          },
                          {
                            new: true
                          }
                        )
                      } else {
                        await Game.findOneAndUpdate(
                          { gameUID: game.gameUID },
                          {
                            $set: {
                              "sport": game.sport,
                              "league": game.league,
                              "startDate": game.startDate,
                              "awayTeam": game.awayTeam,
                              "homeTeam": game.homeTeam,
                              "game.odds.full": game,
                              "game.odds.keys": {
                                "gameMoneylineAwayID": `${ game.gameUID }-1`,
                                "gameSpreadAwayID": `${ game.gameUID }-2`,
                                "gameTotalOverID": `${ game.gameUID }-3`,
                                "gameMoneylineHomeID": `${ game.gameUID }-4`,
                                "gameSpreadHomeID": `${ game.gameUID }-5`,
                                "gameTotalUnderID": `${ game.gameUID }-6`,
                              },
                              "game.keys": {
                                "gameMoneylineAway": {
                                  'id': `${ game.gameUID }-1`,
                                  'initialVal': game.gameMoneylineAwayPrice,
                                  'prevVal': game.gameMoneylineAwayPrice,
                                  'currVal': game.gameMoneylineAwayPrice,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "gameSpreadAway": {
                                  'id': `${ game.gameUID }-2`,
                                  'initialVal': game.gameSpreadAwayHandicap,
                                  'prevVal': game.gameSpreadAwayHandicap,
                                  'currVal': game.gameSpreadAwayHandicap,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "gameTotalOver": {
                                  'id': `${ game.gameUID }-3`,
                                  'initialVal': game.gameTotalPoints,
                                  'prevVal': game.gameTotalPoints,
                                  'currVal': game.gameTotalPoints,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "gameMoneylineHome": {
                                  'id': `${ game.gameUID }-4`,
                                  'initialVal': game.gameMoneylineHomePrice,
                                  'prevVal': game.gameMoneylineHomePrice,
                                  'currVal': game.gameMoneylineHomePrice,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "gameSpreadHome": {
                                  'id': `${ game.gameUID }-5`,
                                  'initialVal': game.gameSpreadHomeHandicap,
                                  'prevVal': game.gameSpreadHomeHandicap,
                                  'currVal': game.gameSpreadHomeHandicap,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "gameTotalUnder": {
                                  'id': `${ game.gameUID }-6`,
                                  'initialVal': game.gameTotalPoints,
                                  'prevVal': game.gameTotalPoints,
                                  'currVal': game.gameTotalPoints,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfMoneylineAway": {
                                  'id': `${ game.gameUID }-1-1`,
                                  'initialVal': game.halfMoneylineAwayPrice,
                                  'prevVal': game.halfMoneylineAwayPrice,
                                  'currVal': game.halfMoneylineAwayPrice,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfSpreadAway": {
                                  'id': `${ game.gameUID }-1-2`,
                                  'initialVal': game.halfSpreadAwayHandicap,
                                  'prevVal': game.halfSpreadAwayHandicap,
                                  'currVal': game.halfSpreadAwayHandicap,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfTotalOver": {
                                  'id': `${ game.gameUID }-1-3`,
                                  'initialVal': game.halfTotalPoints,
                                  'prevVal': game.halfTotalPoints,
                                  'currVal': game.halfTotalPoints,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfMoneylineHome": {
                                  'id': `${ game.gameUID }-1-4`,
                                  'initialVal': game.halfMoneylineHomePrice,
                                  'prevVal': game.halfMoneylineHomePrice,
                                  'currVal': game.halfMoneylineHomePrice,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfSpreadHome": {
                                  'id': `${ game.gameUID }-1-5`,
                                  'initialVal': game.halfSpreadHomeHandicap,
                                  'prevVal': game.halfSpreadHomeHandicap,
                                  'currVal': game.halfSpreadHomeHandicap,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                                "halfTotalUnder": {
                                  'id': `${ game.gameUID }-1-6`,
                                  'initialVal': game.halfTotalPoints,
                                  'prevVal': game.halfTotalPoints,
                                  'currVal': game.halfTotalPoints,
                                  'totalDelta': '0',
                                  'currDelta': '0',
                                  'deltaOperator': 'none',
                                  'lineShift': false,
                                  'dateLineShift': '',
                                  'dateReset': null
                                },
                              }
                            },
                          },
                          {
                            upsert: true,
                            setDefaultsOnInsert: true,
                            new: true
                          }
                        )
                      }
                    }
                  )
                  // await Promise.all(promise)
                })

              }
            }
          )
        })
        // console.log(gamesObj)
      })
  }
  getGames()
})