const mongoose = require('mongoose');
const Game = require('../models/games');
const Sport = require('../models/sport');
const Slip = require('../models/betSlip');
const axios = require('axios');
const cron = require('node-cron');
// const { update } = require('lodash');
require('dotenv').config();

// connects to database and continually seeds it
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(async () => {

  // runs every 12 hours
  setInterval(() => getGames(), 43200000)

  // function to get active games and their respective lines for active sports
  const getGames = async () => {
    // key value pairings for leagues and their respective sports
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

    /* Functions for API calls for different sports  */
    const getMLB = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/baseball_mlb/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getNBA = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=draftkings`
      )
    }

    const getNCAABasketball = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getNCAAFootball = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getNFL = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getNHL = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=draftkings`
      )
    }

    const getPGA = async () => {
      return axios.get(
        `https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/golf/golf?api-key=`
      )
    }

    const getMMA = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/mma_mixed_martial_arts/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getEPL = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_epl/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getLigue = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_france_ligue_one/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getBundesliga = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_germany_bundesliga/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getLaLiga = async () => {
      return axios.get(
        `https://odds.p.rapidapi.com/v4/sports/soccer_spain_la_liga/odds?rapidapi-key=${process.env.REACT_APP_API_KEY}&markets=h2h,spreads,totals&regions=us&oddsFormat=american&bookmakers=fanduel`
      )
    }

    const getATP = async () => {
      return axios.get(
        `https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/atp?api-key=`
      )
    }

    const getWTA = async () => {
      return axios.get(
        `https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/tennis/wta?api-key=`
      )
    }

    await Promise.all([getNBA(), getNFL(), getNHL()])
      .then(data => {
        const gamesObj = {
          // MLB: data[0].data.games,
          NBA: data[0].data,
          // NCAABasketball: data[3].data,
          // NCAAFootball: data[4].data,
          NFL: data[1].data,
          NHL: data[2].data,
          // // PGA: data[5].data.games,
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
            }, async (err, doc) => {
              console.log(sport[0])
              // console.log(Object.values(sport[1]).length < 1)
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
                console.log(doc)
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
                  // console.log(game.bookmakers[0].markets[2])
                  if (game.away_team !== game.bookmakers[0].markets[0].outcomes[0].name) {
                    const updateGame = await Game.find(
                      {
                        gameUID: game.id
                      }, async (err, doc) => {
                        if (game.bookmakers.length === 0) {
                          console.log('fail safe')
                        } else if (doc.length > 0) {
                          await Game.findOneAndUpdate(
                            { gameUID: game.id },
                            {
                              $set: {
                                "sport": leagueRelations[`${ game.sport_title }`],
                                "league": game.sport_title,
                                "startDate": game.commence_time,
                                "awayTeam": game.away_team,
                                "homeTeam": game.home_team,
                                "game.odds.full": game,
                                "game.odds.keys": {
                                  "gameMoneylineAwayID": `${ game.id }-1`,
                                  "gameSpreadAwayID": `${ game.id }-2`,
                                  "gameTotalOverID": `${ game.id }-3`,
                                  "gameMoneylineHomeID": `${ game.id }-4`,
                                  "gameSpreadHomeID": `${ game.id }-5`,
                                  "gameTotalUnderID": `${ game.id }-6`,
                                },
                                "game.keys.gameMoneylineAway.id": `${ game.id }-1`,
                                "game.keys.gameMoneylineAway.currVal": game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                "game.keys.gameMoneylineAway.prevVal": doc[0].game.keys.gameMoneylineAway.currVal,
                                "game.keys.gameSpreadAway.id": `${ game.id }-2`,
                                "game.keys.gameSpreadAway.currVal": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                "game.keys.gameSpreadAway.prevVal": doc[0].game.keys.gameSpreadAway.currVal,
                                "game.keys.gameSpreadAway.currPrice": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                "game.keys.gameSpreadAway.prevPrice": doc[0].game.keys.gameSpreadAway.currPrice,
                                "game.keys.gameTotalOver.id": `${ game.id}-3`,
                                "game.keys.gameTotalOver.currVal": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                "game.keys.gameTotalOver.prevVal": doc[0].game.keys.gameTotalOver.currVal,
                                "game.keys.gameTotalOver.currPrice": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                "game.keys.gameTotalOver.prevPrice": doc[0].game.keys.gameTotalOver.currPrice,
                                "game.keys.gameMoneylineHome.id": `${ game.id }-4`,
                                "game.keys.gameMoneylineHome.currVal": game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                "game.keys.gameMoneylineHome.prevVal": doc[0].game.keys.gameMoneylineHome.currVal,
                                "game.keys.gameSpreadHome.id": `${ game.id }-5`,
                                "game.keys.gameSpreadHome.currVal": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                "game.keys.gameSpreadHome.prevVal": doc[0].game.keys.gameSpreadHome.currVal,
                                "game.keys.gameSpreadHome.currPrice": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                "game.keys.gameSpreadHome.prevPrice": doc[0].game.keys.gameSpreadHome.currPrice,
                                "game.keys.gameTotalUnder.id": `${ game.id }-6`,
                                "game.keys.gameTotalUnder.currVal": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                "game.keys.gameTotalUnder.prevVal": doc[0].game.keys.gameTotalUnder.currVal,
                                "game.keys.gameTotalUnder.currPrice": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                "game.keys.gameTotalUnder.prevPrice": doc[0].game.keys.gameTotalUnder.currPrice,
                              },
                            },
                            {
                              new: true
                            }
                          )
                        } else {
                          await Game.findOneAndUpdate(
                            { gameUID: game.id },
                            {
                              $set: {
                                "sport": leagueRelations[`${ game.sport_title }`],
                                "league": game.sport_title,
                                "startDate": game.commence_time,
                                "awayTeam": game.away_team,
                                "homeTeam": game.home_team,
                                "game.odds.full": game,
                                "game.odds.keys": {
                                  "gameMoneylineAwayID": `${ game.id }-1`,
                                  "gameSpreadAwayID": `${ game.id }-2`,
                                  "gameTotalOverID": `${ game.id }-3`,
                                  "gameMoneylineHomeID": `${ game.id }-4`,
                                  "gameSpreadHomeID": `${ game.id }-5`,
                                  "gameTotalUnderID": `${ game.id }-6`,
                                },
                                "game.keys": {
                                  "gameMoneylineAway": {
                                    'id': `${ game.id }-1`,
                                    'initialVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'prevVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'currVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'dateReset': null
                                  },
                                  "gameSpreadAway": {
                                    'id': `${ game.id }-2`,
                                    'initialVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'prevVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'currVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'initialPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'prevPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'currPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameTotalOver": {
                                    'id': `${ game.id }-3`,
                                    'initialVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'prevVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'currVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'initialPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'prevPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'currPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameMoneylineHome": {
                                    'id': `${ game.id }-4`,
                                    'initialVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'prevVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'currVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'dateReset': null
                                  },
                                  "gameSpreadHome": {
                                    'id': `${ game.id }-5`,
                                    'initialVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'prevVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'currVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'initialPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'prevPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'currPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameTotalUnder": {
                                    'id': `${ game.id }-6`,
                                    'initialVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'prevVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'currVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'initialPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'prevPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'currPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
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
                  } else {
                    const updateGame = await Game.find(
                      {
                        gameUID: game.id
                      }, async (err, doc) => {
                        if (game.bookmakers.length === 0) {
                          console.log('fail safe')
                        } else if (doc.length > 0) {
                          await Game.findOneAndUpdate(
                            { gameUID: game.id },
                            {
                              $set: {
                                "sport": leagueRelations[`${ game.sport_title }`],
                                "league": game.sport_title,
                                "startDate": game.commence_time,
                                "awayTeam": game.away_team,
                                "homeTeam": game.home_team,
                                "game.odds.full": game,
                                "game.odds.keys": {
                                  "gameMoneylineAwayID": `${ game.id }-1`,
                                  "gameSpreadAwayID": `${ game.id }-2`,
                                  "gameTotalOverID": `${ game.id }-3`,
                                  "gameMoneylineHomeID": `${ game.id }-4`,
                                  "gameSpreadHomeID": `${ game.id }-5`,
                                  "gameTotalUnderID": `${ game.id }-6`,
                                },
                                "game.keys.gameMoneylineAway.id": `${ game.id }-1`,
                                "game.keys.gameMoneylineAway.currVal": game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                "game.keys.gameMoneylineAway.prevVal": doc[0].game.keys.gameMoneylineAway.currVal,
                                "game.keys.gameSpreadAway.id": `${ game.id }-2`,
                                "game.keys.gameSpreadAway.currVal": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                "game.keys.gameSpreadAway.prevVal": doc[0].game.keys.gameSpreadAway.currVal,
                                "game.keys.gameSpreadAway.currPrice": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                "game.keys.gameSpreadAway.prevPrice": doc[0].game.keys.gameSpreadAway.currPrice,
                                "game.keys.gameTotalOver.id": `${ game.id}-3`,
                                "game.keys.gameTotalOver.currVal": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                "game.keys.gameTotalOver.prevVal": doc[0].game.keys.gameTotalOver.currVal,
                                "game.keys.gameTotalOver.currPrice": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                "game.keys.gameTotalOver.prevPrice": doc[0].game.keys.gameTotalOver.currPrice,
                                "game.keys.gameMoneylineHome.id": `${ game.id }-4`,
                                "game.keys.gameMoneylineHome.currVal": game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                "game.keys.gameMoneylineHome.prevVal": doc[0].game.keys.gameMoneylineHome.currVal,
                                "game.keys.gameSpreadHome.id": `${ game.id }-5`,
                                "game.keys.gameSpreadHome.currVal": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                "game.keys.gameSpreadHome.prevVal": doc[0].game.keys.gameSpreadHome.currVal,
                                "game.keys.gameSpreadHome.currPrice": game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                "game.keys.gameSpreadHome.prevPrice": doc[0].game.keys.gameSpreadHome.currPrice,
                                "game.keys.gameTotalUnder.id": `${ game.id }-6`,
                                "game.keys.gameTotalUnder.currVal": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                "game.keys.gameTotalUnder.prevVal": doc[0].game.keys.gameTotalUnder.currVal,
                                "game.keys.gameTotalUnder.currPrice": game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                "game.keys.gameTotalUnder.prevPrice": doc[0].game.keys.gameTotalUnder.currPrice,
                              },
                            },
                            {
                              new: true
                            }
                          )
                        } else {
                          await Game.findOneAndUpdate(
                            { gameUID: game.id },
                            {
                              $set: {
                                "sport": leagueRelations[`${ game.sport_title }`],
                                "league": game.sport_title,
                                "startDate": game.commence_time,
                                "awayTeam": game.away_team,
                                "homeTeam": game.home_team,
                                "game.odds.full": game,
                                "game.odds.keys": {
                                  "gameMoneylineAwayID": `${ game.id }-1`,
                                  "gameSpreadAwayID": `${ game.id }-2`,
                                  "gameTotalOverID": `${ game.id }-3`,
                                  "gameMoneylineHomeID": `${ game.id }-4`,
                                  "gameSpreadHomeID": `${ game.id }-5`,
                                  "gameTotalUnderID": `${ game.id }-6`,
                                },
                                "game.keys": {
                                  "gameMoneylineAway": {
                                    'id': `${ game.id }-1`,
                                    'initialVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'prevVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'currVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'dateReset': null
                                  },
                                  "gameSpreadAway": {
                                    'id': `${ game.id }-2`,
                                    'initialVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'prevVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'currVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].point,
                                    'initialPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'prevPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'currPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameTotalOver": {
                                    'id': `${ game.id }-3`,
                                    'initialVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'prevVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'currVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].point,
                                    'initialPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'prevPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'currPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[0].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameMoneylineHome": {
                                    'id': `${ game.id }-4`,
                                    'initialVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'prevVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'currVal': game.bookmakers[0].markets[0] === undefined ? null : game.bookmakers[0].markets[0].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'dateReset': null
                                  },
                                  "gameSpreadHome": {
                                    'id': `${ game.id }-5`,
                                    'initialVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'prevVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'currVal': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].point,
                                    'initialPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'prevPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'currPrice': game.bookmakers[0].markets[1] === undefined ? null : game.bookmakers[0].markets[1].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
                                    'dateReset': null
                                  },
                                  "gameTotalUnder": {
                                    'id': `${ game.id }-6`,
                                    'initialVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'prevVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'currVal': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].point,
                                    'initialPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'prevPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'currPrice': game.bookmakers[0].markets[2] === undefined ? null : game.bookmakers[0].markets[2].outcomes[1].price,
                                    'totalDelta': '0',
                                    'currDelta': '0',
                                    'deltaOperator': 'none',
                                    'lineShift': false,
                                    'dateLineShift': '',
                                    'total_price_delta': '0',
                                    'current_price_delta': '0',
                                    'delta_price_operator': 'none',
                                    'price_shift': false,
                                    'date_price_shift': '',
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
                  }
                  await Promise.all(promise)
                })
              }
            }
          )
        })
        // console.log(gamesObj)
      })
        // function to continually update database with games information
    // const scheduleTask = cron.schedule('30 * * * *', async () => {
    //   console.log(new Date());
    //   await getGames();
    //   console.log('games');
    // })

  }
  // commenting this out so i don't go over my api calls
  // getGames()
})
