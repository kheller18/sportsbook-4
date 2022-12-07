const mongoose = require('mongoose');
const Game = require('../models/games');
// const db = require('../models');
const Sport = require('../models/sport');
const Slip = require('../models/betSlip');
const axios = require('axios');
const cron = require('node-cron');
  // const indexDB = () => {
  //   Game.createIndexes({"game": 1})
  // }
  // indexDB();


/*  
  Baseball:
    leagues:
      MLB
        games: {active, values}
        props: {Active, values}

  Basketball:
    leagues:
      NBA
        games: {active, values}
        props: {Active, values}
      NCAA
        games: {active, values}
        props: {Active, values}

  Football:
    leagues:
      NFL
        games: {active, values}
        props: {Active, values}
      NCAA
        games: {active, values}
        props: {Active, values}

  Golf:
    leagues:
      PGA
        games: {active, values}
        props: {Active, values}

  Hockey:
    leagues:
      NHL
        games: {active, values}
        props: {Active, values}

  MMA
    leagues:
      UFC
        games: {active, values}
        props: {Active, values}

  Soccer:
    leagues:
      EPL
        games: {active, values}
        props: {Active, values}
      Bundesliga
        games: {active, values}
        props: {Active, values}
      Ligue
        games: {active, values}
        props: {Active, values}
      La Liga
        games: {active, values}
        props: {Active, values}
      Champions
        games: {active, values}
        props: {Active, values}

  Tennis:
    leagues:
      ATP
        games: {active, values}
        props: {Active, values}
      WTA
        games: {active, values}
        props: {Active, values}
*/

/* Game Odds */
// https://betonline-baseball-mlb.datafeeds.net/api/json/odds/v2/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-basketball-nba.datafeeds.net/api/json/odds/v2/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-basketball-ncaa.datafeeds.net/api/json/odds/v2/basketball/ncaa?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-football-ncaa.datafeeds.net/api/json/odds/v2/football/ncaa?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-football-nfl.datafeeds.net/api/json/odds/v2/football/nfl?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-golf-golf.datafeeds.net/api/json/odds/v2/golf/golf?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-hockey-nhl.datafeeds.net/api/json/odds/v2/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-mixed-martial-arts-ufc.datafeeds.net/api/json/odds/v2/mixed-martial-arts/ufc?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-soccer-england---premier-league.datafeeds.net/api/json/odds/v2/soccer/england---premier-league?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-soccer-france---ligue-1.datafeeds.net/api/json/odds/v2/soccer/france---ligue-1?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-soccer-germany---bundesliga.datafeeds.net/api/json/odds/v2/soccer/germany---bundesliga?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-soccer-spain---la-liga.datafeeds.net/api/json/odds/v2/soccer/spain---la-liga?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-tennis-atp.datafeeds.net/api/json/odds/v2/tennis/atp?api-key=5afca6d81396efe5c27658dfc7800a84
// https://betonline-tennis-wta.datafeeds.net/api/json/odds/v2/tennis/wta?api-key=5afca6d81396efe5c27658dfc7800a84

/* Game Results */
// https://mlb.cheapdatafeeds.com/api/json/scores/v1/baseball/mlb?month=07&year=2020&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84
// https://nba.cheapdatafeeds.com/api/json/scores/v1/basketball/nba?month=01&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84
// https://nfl.cheapdatafeeds.com/api/json/scores/v1/football/nfl?month=09&year=2020&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84
// https://nhl.cheapdatafeeds.com/api/json/scores/v1/hockey/nhl?month=01&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84
// hahaha

/* Player Props */
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/baseball/mlb-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/basketball/nba-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/basketball/ncaa-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/football/nfl-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/hockey/nhl-props?api-key=5afca6d81396efe5c27658dfc7800a84

  /* NBA Props */
    // player
      // points https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-points?api-key=5afca6d81396efe5c27658dfc7800a84
      // assists https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-assists?api-key=5afca6d81396efe5c27658dfc7800a84
      // rebounds https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-rebounds?api-key=5afca6d81396efe5c27658dfc7800a84
      // p+a+r https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-pts-reb-ast?api-key=5afca6d81396efe5c27658dfc7800a84
      // blocks https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-blocks?api-key=5afca6d81396efe5c27658dfc7800a84
      // turnovers https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-turnovers?api-key=5afca6d81396efe5c27658dfc7800a84
      // 3's https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/made-threes?api-key=5afca6d81396efe5c27658dfc7800a84

    // game

    // futures


  /* MLB Props */
    // player

    // game
      // homeruns https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/home-runs?api-key=5afca6d81396efe5c27658dfc7800a84
      // total bases https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-bases?api-key=5afca6d81396efe5c27658dfc7800a84
      // total runs range https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-runs-range?api-key=5afca6d81396efe5c27658dfc7800a84
      // total strikeouts https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-strikeouts?api-key=5afca6d81396efe5c27658dfc7800a84
      // winning margin https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/winning-margin?api-key=5afca6d81396efe5c27658dfc7800a84



/* Player Props */
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/baseball/mlb-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/basketball/nba-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/basketball/ncaa-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/football/nfl-props?api-key=5afca6d81396efe5c27658dfc7800a84
// https://pinnacle-futures.cheapdatafeeds.com/api/json/futures/v2/hockey/nhl-props?api-key=5afca6d81396efe5c27658dfc7800a84

/* Player Injuries */
// https://player-injuries.datafeeds.net/api/json/injuries/v3/3600/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84
// https://player-injuries.datafeeds.net/api/json/injuries/v3/3600/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84
// https://player-injuries.datafeeds.net/api/json/injuries/v3/3600/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84


// console.log(`${ process.env.REACT_APP_API_KEY }`)

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(async () => {
  // setInterval(() => getGames(), 10000)

  const getMLBProps = async () => {
    getHomeruns = async => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/home-runs?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    getTotalBases = async => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-bases?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    getTotalRunRange = async => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-runs-range?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    getStrikeouts = async => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/total-strikeouts?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    getWinningMargin = async => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/baseball/mlb/winning-margin?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    await Promise.all([getHomeruns(), getTotalBases(), getTotalRunRange(), getStrikeouts(), getWinningMargin()]).then((data) => {
      // console.log()
      const propsObj = {
        MLB: {
          player: {
            hr: data[0].data.games,
            tb: data[1].data.games,
            so: data[3].data.games,
          },
          game: {
            trr: data[2].data.games,
            wm: data[4].data.games
          }
        }
      }
    })

  }

  getMLBProps()


  const getNBAProps = async () => {
    const getNBAPlayerPts = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-points?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAPlayerAssists = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-assists?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAPlayerRebounds = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-rebounds?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAPlayerPAR = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-pts-reb-ast?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAPlayerBlocks = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-blocks?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }


    const getNBAPlayerTurnovers = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/player-turnovers?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAPlayerThrees = async () => {
      return axios.get(`https://pinnacle-props.datafeeds.net/api/json/odds/pinnacle-props/v3/60/basketball/nba/made-threes?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    await Promise.all([getNBAPlayerPts(), getNBAPlayerAssists(), getNBAPlayerRebounds(), getNBAPlayerPAR(), getNBAPlayerBlocks(), getNBAPlayerTurnovers(), getNBAPlayerThrees()]).then((data) => {
      // console.log(data[0].data.games)

      const propsObj = {
        NBA: {
          player: {
            points: data[0].data.games,
            assists: data[1].data.games,
            rebounds: data[2].data.games,
            par: data[3].data.games,
            blocks: data[4].data.games,
            turnovers: data[5].data.games,
            threes: data[6].data.games,
          },
          // game: {

          // }
        }
      }

      // console.log(propsObj.NBA)
      const entries = Object.entries(propsObj).map(async (league, index) => {
        // console.log(league)
        // let propsFound = false;
        // if (league[1]) {

        // }
        const propType = await Object.keys(league[1]).map(async (leagueKey) => {
          // console.log(leagueKey)
          const propsSubType = await Object.entries(league[1][`${ leagueKey }`]).map(async (typeKey) => {
            // console.log(typeKey[0])
            // console.log(typeKey[1])
            const values = await Object.values(typeKey[1]).map(async (prop) => {
              // console.log(prop)
              let overSearch = prop.betName.match(/over/i)
              // let underSearch = false
              if (overSearch !== null) {
                overSearch = true;
              } else {

                overSearch = false;
              }
              // console.log(overSearch)
              const playerSplit = prop.betType.split('(')
              const lineSplit = prop.betName.split(' ')
              const currLine = lineSplit[1];
              // console.log(currLine)
              // console.log(lineSplit[1])
              let player = playerSplit[0].trim()
              player = player.replace('.', '')
              let caseFound = false;
              switch (true) {
                // case (typeof currLine[1] === undefined):
                //   caseFound = true;
                //   break;
                  
                case ((currLine === undefined) && (!caseFound)):
                  // console.log(lineSplit[1])
                  caseFound = true;
                  break;

                case ((overSearch) && (!caseFound)):
                  const updateGameProps = await Game.updateOne(
                    { gameUID: prop.gameUID },
                    {
                      $set: {
                        // [`game.props.players.${player}.${typeKey[0]}.full`]: prop,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.id`]: prop.id,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.name`]: player,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.line`]: currLine,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.odds`]: prop.betPrice,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.startDate`]: prop.startDate,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Over.checkedDate`]: prop.checkedDate,
                        [`game.props.players.${player}.${typeKey[0]}.full`]: prop,
                        [`game.props.player.${typeKey[0]}.${player}.Over.id`]: prop.id,
                        [`game.props.player.${typeKey[0]}.${player}.Over.name`]: player,
                        [`game.props.player.${typeKey[0]}.${player}.Over.line`]: currLine,
                        [`game.props.player.${typeKey[0]}.${player}.Over.odds`]: prop.betPrice,
                        [`game.props.player.${typeKey[0]}.${player}.Over.startDate`]: prop.startDate,
                        [`game.props.player.${typeKey[0]}.${player}.Over.checkedDate`]: prop.checkedDate,
                      },
                    },
                    {
                      new: true
                    }
                  )
                  caseFound = true;
                  break;

                case ((!overSearch) && (!caseFound)):
                  const updateGameUnderProps = await Game.updateOne(
                    { gameUID: prop.gameUID },
                    {
                      $set: {
                        // [`game.props.players.${player}.${typeKey[0]}.full`]: prop,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.id`]:  prop.id,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.name`]: player,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.line`]: currLine,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.odds`]: prop.betPrice,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.startDate`]: prop.startDate,
                        [`game.props.players.${player}.keys.${typeKey[0]}.Under.checkedDate`]: prop.checkedDate,
                        [`game.props.players.${player}.${typeKey[0]}.full`]: prop,
                        [`game.props.player.${typeKey[0]}.${player}.Under.id`]: prop.id,
                        [`game.props.player.${typeKey[0]}.${player}.Under.name`]: player,
                        [`game.props.player.${typeKey[0]}.${player}.Under.line`]: currLine,
                        [`game.props.player.${typeKey[0]}.${player}.Under.odds`]: prop.betPrice,
                        [`game.props.player.${typeKey[0]}.${player}.Under.startDate`]: prop.startDate,
                        [`game.props.player.${typeKey[0]}.${player}.Under.checkedDate`]: prop.checkedDate,
                      },
                    },
                    {
                      new: true
                    }
                  )
                  caseFound = true;
                  break;

                default:
                  // console.log('default')
              }
            })
          })
        }) 
      })
    })
  }

  // getNBAProps();

  // const scheduleTask = cron.schedule('1.5-59 * * * *', async () => {
  //   // console.log(new Date())
  //   await getGames();
  //   // await updateResults();

  // })


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
      // return axios.get(`https://betonline-baseball-mlb.datafeeds.net/api/json/odds/v2/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBA = async () => {
      // return axios.get(`https://betonline-basketball-nba.datafeeds.net/api/json/odds/v2/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNCAABasketball = async () => {
      return axios.get(`https://betonline-basketball-ncaa.datafeeds.net/api/json/odds/v2/basketball/ncaa?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNCAAFootball = async () => {
      return axios.get(`https://betonline-football-ncaa.datafeeds.net/api/json/odds/v2/football/ncaa?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNFL = async () => {
      return axios.get(`https://betonline-football-nfl.datafeeds.net/api/json/odds/v2/football/nfl?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getPGA = async () => {
      // return axios.get(`https://betonline-golf-golf.datafeeds.net/api/json/odds/v2/golf/golf?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/golf/golf?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNHL = async () => {
      // return axios.get(`https://betonline-hockey-nhl.datafeeds.net/api/json/odds/v2/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getMMA = async () => {
      // return axios.get(`https://betonline-mixed-martial-arts-ufc.datafeeds.net/api/json/odds/v2/mixed-martial-arts/ufc?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/mixed-martial-arts/ufc?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getEPL = async () => {
      // return axios.get(`https://betonline-soccer-england---premier-league.datafeeds.net/api/json/odds/v2/soccer/england---premier-league?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/soccer/england-premier-league?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getLigue = async () => {
      // return axios.get(`https://betonline-soccer-france---ligue-1.datafeeds.net/api/json/odds/v2/soccer/france---ligue-1?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/soccer/france-ligue-1?api-key=5afca6d81396efe5c27658dfc7800a84`);
    }

    const getBundesliga = async () => {
      // return axios.get(`https://betonline-soccer-germany---bundesliga.datafeeds.net/api/json/odds/v2/soccer/germany---bundesliga?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/soccer/germany-bundesliga?api-key=5afca6d81396efe5c27658dfc7800a84`);
    }

    const getLaLiga = async () => {
      // return axios.get(`https://betonline-soccer-spain---la-liga.datafeeds.net/api/json/odds/v2/soccer/spain---la-liga?api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://betonline-legacy.datafeeds.net/api/json/odds/betonline/v2/60/soccer/spain-la-liga?api-key=5afca6d81396efe5c27658dfc7800a84`);
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
    await Promise.all([getMLB(), getNBA(), getNHL(), getMMA(), getEPL(), getATP(), getWTA()])
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

        const gamesObj = {
          // MLB: data[0].data.games,
          NBA: data[1].data.games,
          // // NCAABasketball: data[2].data.games,
          // // NCAAFootball: data[3].data.games,
          // // NFL: data[4].data.games,
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

        console.log(gamesObj.MLB)


        // Object.entries(gamesObj).map((sport, index) => {
        //   if (Object.values(sport[1]).length < 1) {
        //     Sport.updateOne(
        //       { sportTitle: sport[0] },
        //       {
        //         sportTitle: sport[0],
        //         active: false,
        //         date: new Date().setDate(new Date().getDate()-10),
        //       },
        //       {
        //         upsert: true
        //       }
        //     ).then(data => {
        //     })
        //   } else {
        //     Sport.updateOne(
        //       { sportTitle: sport[0] },
        //       {
        //         sportTitle: sport[0],
        //         active: true,
        //         date: new Date().setDate(new Date().getDate()-10),
        //       },
        //       {
        //         upsert: true
        //       }
        //     ).then(data => {
        //       // console.log(data)
        //     })
        // here for current
        // Object.entries(gamesObj).map(async (sport, index) => {
        //   if (Object.values(sport[1]).length < 1) {
        //     Sport.updateOne(
        //       { sportTitle: leagueRelations[`${ sport[0] }`] },
        //       {
        //         sportTitle: leagueRelations[`${ sport[0] }`],
        //         [`leagues.${ sport[0] }`]: {games: {active: false}, props: {active: false}},
        //         active: false,
        //         date: new Date().setDate(new Date().getDate()-10),
        //       },
        //       {
        //         upsert: true
        //       }
        //     )
        //   } else {
        //     Sport.updateOne(
        //       { sportTitle: leagueRelations[`${ sport[0] }`] },
        //       {
        //         sportTitle: leagueRelations[`${ sport[0] }`],
        //         [`leagues.${ sport[0] }`]: {games: {active: true}, props: {active: false}},
        //         active: true,
        //         date: new Date().setDate(new Date().getDate()-10),
        //       },
        //       {
        //         upsert: true
        //       }
        //     )

        // const entries = Object.entries(gamesObj).map(async (sport, index) => {
        //   if (Object.values(sport[1]).length < 1) {
        //     await Sport.updateOne(
        //       { sportTitle: leagueRelations[`${ sport[0] }`] },
        //       {
        //         $set: {
        //           "sportTitle": leagueRelations[`${ sport[0] }`],
        //           [`leagues.${ sport[0] }.games.active`]: false,
        //           "active": false,
        //           "date": Date.now()
        //         }
        //       }
        //     )
        //   }
        // )})

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
        //   }
        // })
      })
  }
            // const promise = await Object.values(sport[1]).map(async (game, index) => {
            //   const updateGame = await Game.find(
            //     {
            //       gameUID: game.gameUID
            //     }, async (err, doc) => {
            //       if (doc.length > 0) {
            //         await Game.findOneAndUpdate(
            //           { gameUID: game.gameUID },
            //           {
            //             $set: {
            //               "sport": game.sport,
            //               "league": game.league,
            //               "startDate": game.startDate,
            //               "awayTeam": game.awayTeam,
            //               "homeTeam": game.homeTeam,
            //               "game.odds.full": game,
            //               "game.odds.keys": {
            //                 "gameMoneylineAwayID": `${ game.gameUID }-1`,
            //                 "gameSpreadAwayID": `${ game.gameUID }-2`,
            //                 "gameTotalOverID": `${ game.gameUID }-3`,
            //                 "gameMoneylineHomeID": `${ game.gameUID }-4`,
            //                 "gameSpreadHomeID": `${ game.gameUID }-5`,
            //                 "gameTotalUnderID": `${ game.gameUID }-6`,
            //               },
            //               "game.keys.gameMoneylineAway.id": `${ game.gameUID }-1`,
            //               "game.keys.gameMoneylineAway.currVal": game.gameMoneylineAwayPrice,
            //               "game.keys.gameMoneylineAway.prevVal": doc[0].game.keys.gameMoneylineAway.currVal,
            //               "game.keys.gameSpreadAway.id": `${ game.gameUID }-2`,
            //               "game.keys.gameSpreadAway.currVal": game.gameSpreadAwayHandicap,
            //               "game.keys.gameSpreadAway.prevVal": doc[0].game.keys.gameSpreadAway.currVal,
            //               "game.keys.gameTotalOver.id": `${ game.gameUID }-3`,
            //               "game.keys.gameTotalOver.currVal": game.gameTotalPoints,
            //               "game.keys.gameTotalOver.prevVal": doc[0].game.keys.gameTotalOver.currVal,
            //               "game.keys.gameMoneylineHome.id": `${ game.gameUID }-4`,
            //               "game.keys.gameMoneylineHome.currVal": game.gameMoneylineHomePrice,
            //               "game.keys.gameMoneylineHome.prevVal": doc[0].game.keys.gameMoneylineHome.currVal,
            //               "game.keys.gameSpreadHome.id": `${ game.gameUID }-5`,
            //               "game.keys.gameSpreadHome.currVal": game.gameSpreadHomeHandicap,
            //               "game.keys.gameSpreadHome.prevVal": doc[0].game.keys.gameSpreadHome.currVal,
            //               "game.keys.gameTotalUnder.id": `${ game.gameUID }-6`,
            //               "game.keys.gameTotalUnder.currVal": game.gameTotalPoints,
            //               "game.keys.gameTotalUnder.prevVal": doc[0].game.keys.gameTotalUnder.currVal,
            //             },
            //           },
            //           {
            //             new: true
            //           }
            //         )
            //       } else {
            //         await Game.findOneAndUpdate(
            //           { gameUID: game.gameUID },
            //           {
            //             $set: {
            //               "sport": game.sport,
            //               "league": game.league,
            //               "startDate": game.startDate,
            //               "awayTeam": game.awayTeam,
            //               "homeTeam": game.homeTeam,
            //               "game.odds.full": game,
            //               "game.odds.keys": {
            //                 "gameMoneylineAwayID": `${ game.gameUID }-1`,
            //                 "gameSpreadAwayID": `${ game.gameUID }-2`,
            //                 "gameTotalOverID": `${ game.gameUID }-3`,
            //                 "gameMoneylineHomeID": `${ game.gameUID }-4`,
            //                 "gameSpreadHomeID": `${ game.gameUID }-5`,
            //                 "gameTotalUnderID": `${ game.gameUID }-6`,
            //               },
            //               "game.keys": {
            //                 "gameMoneylineAway": {
            //                   'id': `${ game.gameUID }-1`,
            //                   'initialVal': game.gameMoneylineAwayPrice,
            //                   'prevVal': game.gameMoneylineAwayPrice,
            //                   'currVal': game.gameMoneylineAwayPrice,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },
            //                 "gameSpreadAway": {
            //                   'id': `${ game.gameUID }-2`,
            //                   'initialVal': game.gameSpreadAwayHandicap,
            //                   'prevVal': game.gameSpreadAwayHandicap,
            //                   'currVal': game.gameSpreadAwayHandicap,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },
            //                 "gameTotalOver": {
            //                   'id': `${ game.gameUID }-3`,
            //                   'initialVal': game.gameTotalPoints,
            //                   'prevVal': game.gameTotalPoints,
            //                   'currVal': game.gameTotalPoints,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },
            //                 "gameMoneylineHome": {
            //                   'id': `${ game.gameUID }-4`,
            //                   'initialVal': game.gameMoneylineHomePrice,
            //                   'prevVal': game.gameMoneylineHomePrice,
            //                   'currVal': game.gameMoneylineHomePrice,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },
            //                 "gameSpreadHome": {
            //                   'id': `${ game.gameUID }-5`,
            //                   'initialVal': game.gameSpreadHomeHandicap,
            //                   'prevVal': game.gameSpreadHomeHandicap,
            //                   'currVal': game.gameSpreadHomeHandicap,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },
            //                 "gameTotalUnder": {
            //                   'id': `${ game.gameUID }-6`,
            //                   'initialVal': game.gameTotalPoints,
            //                   'prevVal': game.gameTotalPoints,
            //                   'currVal': game.gameTotalPoints,
            //                   'totalDelta': '0',
            //                   'currDelta': '0',
            //                   'deltaOperator': 'none',
            //                   'lineShift': false,
            //                   'dateLineShift': '',
            //                   'dateReset': null
            //                 },

            //               }
            //             },
            //           },
            //           {
            //             upsert: true,
            //             setDefaultsOnInsert: true,
            //             new: true
            //           }
            //         )
            //       }
            //     }
            //   )
            //   // await Promise.all(promise)
            // })

  // setInterval(() => updateResults(), 10000)

  const updateResults = async () => {
    let resultsArr = [];
    let resultsObj = {};

    const getMLBResults = () => {
      // return axios.get(`https://mlb.cheapdatafeeds.com/api/json/scores/v1/baseball/mlb?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://live-scores.datafeeds.net/api/json/scores/v3/60/baseball/mlb?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNBAResults = () => {
      // return axios.get(`https://nba.cheapdatafeeds.com/api/json/scores/v1/basketball/nba?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://live-scores.datafeeds.net/api/json/scores/v3/60/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNFLResults = () => {
      // return axios.get(`https://nfl.cheapdatafeeds.com/api/json/scores/v1/football/nfl?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
    }

    const getNHLResults = () => {
      // return axios.get(`https://nhl.cheapdatafeeds.com/api/json/scores/v1/hockey/nhl?month=03&year=2021&seasonType=Regular&api-key=5afca6d81396efe5c27658dfc7800a84`)
      return axios.get(`https://live-scores.datafeeds.net/api/json/scores/v3/60/hockey/nhl?api-key=5afca6d81396efe5c27658dfc7800a84`);
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
            await Promise.all(updateDocs)
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
            await Promise.all(updateDocs)
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
            NHL: data[3].data.games
        }
      })

    await Promise.all([updateGamesDB()])
      .then((data) => {
        // console.log(data[0])
      })

    if (resultsArr.length > 0) {
      await Promise.all([updateSlipsDB(resultsArr)])
    } 
  }
})




    // Promise.all([getMLBResults(), getNBAResults(), getNFLResults(), getNHLResults()])
    //   .then(data => {
    //     const resultsObj = {
    //         // MLB: data[0].data.games,
    //         NBA: data[1].data.games,
    //         // NFL: data[2].data.games,
    //         // NHL: data[3].data.games
    //     }

    //     Object.entries(resultsObj).map((sport, index) => {
    //       // if (Object.values(sport[1]).length > 0) {
    //         console.log(sport)
    //         Object.values(sport[1]).map((game, index) => {
    //           console.log('before')
    //           db.findOneAndUpdate(
    //             {
    //               $and: [ { gameUID: { $eq: game.gameUID  } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live', 'Completed']} } ]
    //             },
    //             { 
    //               "game.results.full": game,
    //               "game.results.final": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal),
    //               status: game.status,
    //               date: new Date().setDate(new Date().getDate()),
    //             },
    //             {
    //               new: true
    //             }, (err, doc) => {
    //               if (doc != null) {
    //                 if (doc.status === 'Completed') {
    //                   console.log('push')
    //                   resultsArr.push(doc)
    //                 }
    //               }
    //             }
    //           )
    //           // .then(() => {
    //           //   console.log('help')
    //           // })
    //           // .then((data) => {
    //           //   if (data != null) {
    //           //     if (data.status === 'Completed') {
    //           //       // console.log('completed')
    //           //       console.log('push')
    //           //       resultsArr.push(data)
    //           //     }
    //           //   }
    //           // })
    //         }) 
    //       // } 
    //     })
    //     console.log('after')
    //   })
    // return resultsArr;


      // Object.values(sport[1]).map((game, index) => {
      //   console.log('before')
      //   db.findOneAndUpdate(
      //     {
      //       $and: [ { gameUID: { $eq: game.gameUID  } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live', 'Completed']} } ]
      //     },
      //     { 
      //       "game.results.full": game,
      //       "game.results.final": parseInt(game.scoreAwayTotal) + parseInt(game.scoreHomeTotal),
      //       status: game.status,
      //       date: new Date().setDate(new Date().getDate()),
      //     },
      //     {
      //       new: true
      //     }, (err, doc) => {
      //       if (doc != null) {
      //         if (doc.status === 'Completed') {
      //           console.log('push')
      //           resultsArr.push(doc)
      //         }
      //       }
      //     }
      //   )
      // }) 
          // } 
        // })
      // return resultsArr;

    // }


              // const updated2 = await Game.findOneAndUpdate(
          //   {
          //     $and: [ { gameUID: { $eq: game.gameUID  } }, { status: { $in: ['Unplayed', 'Upcoming', 'Live']} } ]
          //   },
          //   { 
          //     $set: {
          //       "game.results.gameMoneylineAway": `${ game.gameUID }-1`,
          //     // "game.results.gameSpreadAwayID": `${ game.gameUID }-2`,
          //     // "game.results.gameTotalOverID": `${ game.gameUID }-3`,
          //     // "game.results.gameMoneylineHomeID": `${ game.gameUID }-4`,
          //     // "game.results.gameSpreadHomeID": `${ game.gameUID }-5`,
          //     // "game.results.gameTotalUnderID": `${ game.gameUID }-6`,
          //     }
          //   },
          //   {
          //     new: true
          //   }, 
          //   // (err, doc) => {
          //   //   if (doc != null) {
          //   //     if (doc.status === 'Completed') {
          //   //       // console.log(doc)
          //   //       resultsArr.push(doc)
          //   //     }
          //   //   }
          //   // }
          // )

              // Game.findOneAndUpdate(
              //   { gameUID: game.gameUID },
              //   { 
              //     $set: {
              //       "game.odds.gameMoneylineAwayID": `${ game.gameUID }-1`,
              //       "game.odds.gameSpreadAwayID": `${ game.gameUID }-2`,
              //       "game.odds.gameTotalOverID": `${ game.gameUID }-3`,
              //       "game.odds.gameMoneylineHomeID": `${ game.gameUID }-4`,
              //       "game.odds.gameSpreadHomeID": `${ game.gameUID }-5`,
              //       "game.odds.gameTotalUnderID": `${ game.gameUID }-6`,
              //     }
              //   },
              //   {
              //     // new: true
              //   }
              // ).then(data => {})


                  // "betInfo.payout": {
                  //   $switch: {
                  //     branches: [
                  //       {
                  //         case: { $eq : [ "betInfo.outcome.logic" , true ] },
                  //         then: "100"
                  //       }
                  //     ],
                  //     default: "-100"
                  //   }
                  // },


          // {
          //   updateMany: {
          //     "filter": {
          //       "betUID": { $in: [ results.results.moneylineHome.id ] },
          //       "betInfo.outcome.logic": true
          //     },
          //     "update": {
          //       $set: {
          //         "betInfo.payout": {$eq : "$betInfo.toWin"}
          //       }
          //     }
          //   }
          // }
        // {ordered: true},
        // (err, doc) => {
        //   console.log(doc)
        // }

        // const updated2 = await Slip.updateMany(
        //   {            
        //     "betUID": { $in: [ results.results.moneylineHome.id ] },
        //     "betInfo.outcome.logic": true
        //   },
        //   {
        //     $set: {

        //     }
        //   },
        //   {},
        // )
        // const updated = await Slip.bulkWrite([
        //   { 
        //     updateMany: 
        //       {
        //         "filter": {
        //           "betUID": { $in: [ results.results.moneylineHome.id ] },
        //         },
        //         "update": {
        //           $set: {
        //             "betInfo.outcome": { "value": "" , "logic": results.results.moneylineHome.value },
        //             "betInfo.status": "Completed"
        //           },
        //           new: true
        //         },
        //       } (err, doc) => {
        //         console.log(doc)
        //       },
        //   },
        // ],
        // )
        // .then(data => {console.log(data)})
        
        // await Promise.all(updated);


    // const updateSlipsDB = async (gameResults) => {
    //   const updated = await Slip.find(
    //     {
    //       "gameResults.gameUID": { $in: [slip.gameUID] }
    //     },
    //     {},
    //     {
    //       new: true
    //     }
    //   )


            // if (doc != null) {
            //   if (doc.betInfo.outcome.logic === true) {
            //     await Slip.find(
            //       { 
            //         "betInfo.betKey": doc.betInfo.betKey,
            //         // "_id": doc._id
            //       },
            //       {
            //         $set: {
            //           "betInfo.payout": doc.betInfo.toWin
            //         }
            //       },
            //     )
            //   } else {
            //     await Slip.find(
            //       { 
            //         "betInfo.betKey": doc.betInfo.betKey,
            //         // "_id": doc._id
            //       },
            //       {
            //         $set: {
            //           "betInfo.payout": `-${ doc.betInfo.toLose }`
            //         }
            //       },
            //     )
            //   }
        // const updated4 = await Slip.find(
        //   {
        //     "betUID": { $in: [ results.results.awayDifference.id ] },
        //     "betInfo.line": { $lt: results.results.awayDifference.value }
        //   },
        //   async (err, doc) => {
        //     const updateDocs = await docs.map(async (doc) => {
        //       await Slip.findOneAndUpdate(
        //         { 
        //           "_id": doc._id,
        //         },
        //         {
        //           $set: {
        //             "betInfo.payout": doc.betInfo.Lose,
        //             "betInfo.outcome": { "value": "" , "logic": false },
        //             "betInfo.status": "Completed"
        //           }
        //         },
        //       )
        //     })
        //     await Promise.all(updateDocs)
        //   }
        // )

        // const updated5 = await Slip.find(
        //   {
        //     "betUID": { $in: [ results.results.homeDifference.id ] },
        //     "betInfo.line": { $gt: results.results.homeDifference.value }
        //   },
        //   {
        //     $set: {
        //       "betInfo.outcome": { "value": "" , "logic": true },
        //       "betInfo.status": "Completed"
        //     }
        //   },
        //   {
        //     new: true,
        //     multi: true
        //   }, async (err, doc) => {
        //     if (doc != null) {
        //       if (doc.betInfo.outcome.logic === true) {
        //         await Slip.findOneAndUpdate(
        //           { 
        //             "betInfo.betKey": doc.betInfo.betKey,
        //             "_id": doc._id
        //           },
        //           {
        //             $set: {
        //               "betInfo.payout": doc.betInfo.toWin
        //             }
        //           },
        //         )
        //       } 
        //     }
        //   }
        // )

        // const updated6 = await Slip.find(
        //   {
        //     "betUID": { $in: [ results.results.homeDifference.id ] },
        //     "betInfo.line": { $lt: results.results.homeDifference.value }
        //   },
        //   {
        //     $set: {
        //       "betInfo.outcome": { "value": "" , "logic": false },
        //       "betInfo.status": "Completed"
        //     }
        //   },
        //   {
        //     new: true,
        //     multi: true
        //   }, async (err, doc) => {
        //     if (doc != null) {
        //       if (doc.betInfo.outcome.logic === false) {
        //         await Slip.findOneAndUpdate(
        //           { 
        //             "betInfo.betKey": doc.betInfo.betKey,
        //             "_id": doc._id
        //           },
        //           {
        //             $set: {
        //               "betInfo.payout": `-${ doc.betInfo.toLose }`
        //             }
        //           },
        //         )
        //       } 
        //     }
        //   }
        // )
