import React, { useEffect, useState } from 'react';
import Button from './Button';
import Lines from './Lines';
import '../styles/LinesContainer.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LinesContainer = (props) => {
  const header = ['TIME', 'TEAM', 'MONEYLINE', 'SPREAD', 'TOTAL'];
  const [isLoading, setIsLoading] = useState(false);
  const [slipType, setSlipType] = useState({type: "Straight", new: true, special: {value: false, slipID: ''}})
  // const [activeBtn, setActiveBtn] = useState({ color: '#EFEFEF' })
  const [parlayArr, setParlayArr] = useState([])
  const [leagueType, setLeagueType] = useState('GAME LINES')
  const [straightArr, setStraightArr] = useState([])
  const [teaserArr, setTeaserArr] = useState([])
  // const [content, sport, removalData] = [props.state, content.sport, props.removalData];
  const content = props.state;
  const sport = content.sport;
  const removalData = props.removalData
  let index, newStraightArr, newTeaserArr, newParlayArr;

  const sportClasses = {
    'Baseball': 'fas fa-baseball-ball',
    'Football': 'fas fa-football-ball',
    'Soccer': 'fas fa-futbol',
    'Hockey': 'fas fa-hockey-puck',
    'Golf': 'fas fa-golf-ball',
    'Tennis': 'fas fa-table-tennis',
    'MMA': 'fas fa-user-ninja',
    'Basketball': 'fas fa-basketball-ball'
  }

  // let multiBetArr = [];

  const handleSlipTypeChange = (type) => {
    switch (type) {
      case 'Straight':
        setSlipType({type: "Straight", new: true, special: {value: false, slipID: ''}})
        // setStraightArr([])
        break;

      case 'Parlay':
        setSlipType({type: "Parlay", new: true, special: {value: false, slipID: ''}})
        setParlayArr([])
        break;

      case 'Teaser':
        setSlipType({type: "Teaser", new: true, special: {value: false, slipID: ''}})
        setTeaserArr([])
        break;

      default:
        console.log('inside sliptypedefalt')
        break
    }
  }

  const handleClick = (e, game) => {
    e.preventDefault();
    e.persist();
    console.log(game)
    switch(slipType.type) {
      case 'Straight':
        switch (e.target.value) {
          case 'away-moneyline':
            if (straightArr.includes(game.game.keys.gameMoneylineAway.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameMoneylineAway.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameMoneylineAway.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            }
            break;
          case 'away-spread':
            if (straightArr.includes(game.game.keys.gameSpreadAway.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameSpreadAway.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameSpreadAway.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'over':
            if (straightArr.includes(game.game.keys.gameTotalOver.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameTotalOver.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameTotalOver.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-moneyline':
            if (straightArr.includes(game.game.keys.gameMoneylineHome.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameMoneylineHome.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameMoneylineHome.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-spread':
            if (straightArr.includes(game.game.keys.gameSpreadHome.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameSpreadHome.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameSpreadHome.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'under':
            if (straightArr.includes(game.game.keys.gameTotalUnder.id)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.keys.gameTotalUnder.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalUnder.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.keys.gameTotalUnder.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalUnder.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          default:
            console.log('None selected.')
            break;
        };
        break;

      case 'Parlay':
        if (slipType.new) {
          setParlayArr([]);
          console.log(game)
          switch (e.target.value) {
            case 'away-moneyline':
              setParlayArr([game.game.keys.gameMoneylineAway.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: false });
              break;
            case 'away-spread':
              setParlayArr([game.game.keys.gameSpreadAway.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'over':
              setParlayArr([game.game.keys.gameTotalOver.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'home-moneyline':
              setParlayArr([game.game.keys.gameMoneylineHome.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'home-spread':
              setParlayArr([game.game.keys.gameSpreadHome.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'under':
              setParlayArr([game.game.keys.gameTotalUnder.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            default:
              console.log('None selected.')
              break;
          };
          setSlipType({type: 'Parlay', new: false, special: {value: false, slipID: ''}})
        } else if (slipType.special.value === true) {
          switch (e.target.value) {
            case 'away-moneyline':
              if (parlayArr.includes(game.game.keys.gameMoneylineHome.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameMoneylineAway.id)) {
                index = parlayArr.indexOf(game.game.keys.gameMoneylineAway.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameMoneylineAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;

            case 'away-spread':
              if (parlayArr.includes(game.game.keys.gameSpreadHome.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameSpreadAway.id)) {
                index = parlayArr.indexOf(game.game.keys.gameSpreadAway.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'over':
              if (parlayArr.includes(game.game.keys.gameTotalUnder.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameTotalOver.id)) {
                index = parlayArr.indexOf(game.game.keys.gameTotalOver.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'home-moneyline':
              if (parlayArr.includes(game.game.keys.gameMoneylineAway.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameMoneylineHome.id)) {
                index = parlayArr.indexOf(game.game.keys.gameMoneylineHome.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameMoneylineHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'home-spread':
              if (parlayArr.includes(game.game.keys.gameSpreadAway.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameSpreadHome.id)) {
                index = parlayArr.indexOf(game.game.keys.gameSpreadHome.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'under':
              if (parlayArr.includes(game.game.keys.gameTotalOver.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameTotalUnder.id)) {
                index = parlayArr.indexOf(game.game.keys.gameTotalUnder.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('special default')
              break;
          }
        } else {
          switch (e.target.value) {
            case 'away-moneyline':
              if (parlayArr.includes(game.game.keys.gameMoneylineHome.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameMoneylineAway.id)) {
                index = parlayArr.indexOf(game.game.keys.gameMoneylineAway.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameMoneylineAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameMoneylineAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: null, odds: game.game.keys.gameMoneylineAway.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;
            case 'away-spread':
              if (parlayArr.includes(game.game.keys.gameSpreadHome.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameSpreadAway.id)) {
                index = parlayArr.indexOf(game.game.keys.gameSpreadAway.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameSpreadAway.currVal), odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'over':
              if (parlayArr.includes(game.game.keys.gameTotalUnder.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameTotalOver.id)) {
                index = parlayArr.indexOf(game.game.keys.gameTotalOver.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-moneyline':
              if (parlayArr.includes(game.game.keys.gameMoneylineAway.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameMoneylineHome.id)) {
                index = parlayArr.indexOf(game.game.keys.gameMoneylineHome.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameMoneylineHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameMoneylineHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: null, odds: game.game.keys.gameMoneylineHome.currVal, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (parlayArr.includes(game.game.keys.gameSpreadAway.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameSpreadHome.id)) {
                index = parlayArr.indexOf(game.game.keys.gameSpreadHome.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameSpreadHome.currVal), odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (parlayArr.includes(game.game.keys.gameTotalOver.id)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.keys.gameTotalUnder.id)) {
                index = parlayArr.indexOf(game.game.keys.gameTotalUnder.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: (game.game.keys.gameTotalOver.currVal), odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('None selected.')
              break;
          };
        }
        break;

      case 'Teaser':
        if (slipType.new) {
          setTeaserArr([]);
          if (game.game.odds.full.sport === 'Basketball') {
            switch (e.target.value) {
              case 'away-spread':
                setTeaserArr([game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'over':
                setTeaserArr([game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'home-spread':
                setTeaserArr([game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'under':
                setTeaserArr([game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              default:
                console.log('None selected.')
                break;
            };
          } else {
            switch (e.target.value) {
              case 'away-spread':
                setTeaserArr([game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'over':
                setTeaserArr([game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'home-spread':
                setTeaserArr([game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'under':
                setTeaserArr([game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              default:
                console.log('None selected.')
                break;
            };
          }
          setSlipType({type: "Teaser", new: false, special: {value: false, slipID: ''}})
        } else if (slipType.special.value === true) {
          switch (e.target.value) {
            case 'away-spread':
              if (teaserArr.includes(game.game.keys.gameSpreadHome.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameSpreadAway.id)) {
                index = teaserArr.indexOf(game.game.keys.gameSpreadAway.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'over':
              if (teaserArr.includes(game.game.keys.gameTotalUnder.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameTotalOver.id)) {
                index = teaserArr.indexOf(game.game.keys.gameTotalOver.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (teaserArr.includes(game.game.keys.gameSpreadAway.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameSpreadHome.id)) {
                index = teaserArr.indexOf(game.game.keys.gameSpreadHome.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (teaserArr.includes(game.game.keys.gameTotalOver.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameTotalUnder.id)) {
                index = teaserArr.indexOf(game.game.keys.gameTotalUnder.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('None selected.')
              break;
          }
        } else {
          switch (e.target.value) {
            case 'away-spread':
              if (teaserArr.includes(game.game.keys.gameSpreadHome.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameSpreadAway.id)) {
                index = teaserArr.indexOf(game.game.keys.gameSpreadAway.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameSpreadAway.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadAway.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameSpreadAway.currVal, odds: game.game.keys.gameSpreadAway.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'over':
              if (teaserArr.includes(game.game.keys.gameTotalUnder.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameTotalOver.id)) {
                index = teaserArr.indexOf(game.game.keys.gameTotalOver.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameTotalOver.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalOver.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.away_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalOver.currPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (teaserArr.includes(game.game.keys.gameSpreadAway.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameSpreadHome.id)) {
                index = teaserArr.indexOf(game.game.keys.gameSpreadHome.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameSpreadHome.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameSpreadHome.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameSpreadHome.currVal, odds: game.game.keys.gameSpreadHome.currPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (teaserArr.includes(game.game.keys.gameTotalOver.id)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.keys.gameTotalUnder.id)) {
                index = teaserArr.indexOf(game.game.keys.gameTotalUnder.id)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.keys.gameTotalUnder.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.keys.gameTotalUnder.id, sport: game.sport, gameUID: game.gameUID, team: game.game.odds.full.home_team, line: game.game.keys.gameTotalOver.currVal, odds: game.game.keys.gameTotalUnder.currPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('None selected.')
              break;
          };
        }
        break;

      default:
        console.log('invalid sliptype')
        break;
    }
  };

  // console.log(games)
  useEffect(() => {
    if (removalData.target !== '') {
      switch (removalData.type) {
        case 'Straight':
          newStraightArr = straightArr.filter((bet) => bet !== removalData.target)
          setStraightArr(newStraightArr)
          break;

        case 'Parlay':
          if (removalData.operation === 'delete') {
            setParlayArr([])
            if (slipType.type === 'Parlay') {
              setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
            }
          } else {
            newParlayArr = parlayArr.filter((bet) => bet !== removalData.target)
            if (newParlayArr.length < 1) {
              setSlipType({type: "Parlay", new: true, special: {value: false, slipID: ''}})
            }
            setParlayArr(newParlayArr)
          }
          break;

        case 'Teaser':
          if (removalData.operation === 'delete') {
            setTeaserArr([])
            if (slipType.type === 'Teaser') {
              setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
            }
          } else {
            newTeaserArr = teaserArr.filter((bet) => bet !== removalData.target)
            if (newTeaserArr.length < 1) {
              setSlipType({type: "Teaser", new: true, special: {value: false, slipID: ''}})
            }
            setTeaserArr(newTeaserArr)
          }
          break;

        default:
          console.log('inproper removal data')
          break;
      }
    } else if (removalData.retroactive.targets.length > 0) {
      switch (removalData.retroactive.type) {
        case 'Parlay':
          setSlipType({type: 'Parlay', new: false, special: {value: true, slipID: removalData.retroactive.slipID}})
          setParlayArr(removalData.retroactive.targets)
          break;

        case 'Teaser':
          setSlipType({type: 'Teaser', new: false, special: {value: true, slipID: removalData.retroactive.slipID}})
          setTeaserArr(removalData.retroactive.targets)
          break;

        default:
          console.log('invalid removaldataretroactive')
          break;
      }
    } else if (removalData.emptyAll) {
      setStraightArr([])
      setParlayArr([])
      setTeaserArr([])
      setSlipType({type: "Straight", new: true, special: {value: false, slipID: ''}})
    }

  }, [props.removalData]);
  // console.log(content.games)
  return (
    <div className='lines-container'>
      {isLoading ? '' :
        <div className='game-container'>
          <div className='game-container-header'>
            {/* <div className='sport-title'><i className={sportClasses[`${ content.sport }`]}></i>&nbsp;{content.league}&nbsp;<span className='sport-title-subheader'>GAME LINES</span></div> */}
            <div className='sport-title'><i className={sportClasses[`${ content.sport }`]}></i> {content.league} GAME LINES</div>
          </div>
          {((leagueType === 'GAME LINES') && ((sport === 'Basketball') || (sport === 'Football'))) ?
            <div className='bet-type-buttons'>
              <Button type="button" className={slipType.type === 'Straight' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='straight' onClick={() => handleSlipTypeChange('Straight')}>STRAIGHT</Button>
              <Button type="button" className={slipType.type === 'Parlay' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='parlay' onClick={() => handleSlipTypeChange('Parlay')}>PARLAY</Button>
              <Button type="button" className={slipType.type === 'Teaser' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='teaser' onClick={() => handleSlipTypeChange('Teaser')}>TEASER</Button>
            </div>
          :
            <div className='bet-type-buttons'>
              <Button type="button" className={slipType.type === 'Straight' ? 'betTypeBtn betTypeBtnTwo betTypeBtnActive' : 'betTypeBtn betTypeBtnTwo'} id='straight' onClick={() => handleSlipTypeChange('Straight')}>STRAIGHT</Button>
              <Button type="button" className={slipType.type === 'Parlay' ? 'betTypeBtn betTypeBtnTwo betTypeBtnActive' : 'betTypeBtn betTypeBtnTwo'} id='parlay-two' onClick={() => handleSlipTypeChange('Parlay')}>PARLAY</Button>
            </div>
          }
          <table className='table'>
            {leagueType === 'GAME LINES' ?
              <thead>
                <tr className='table-headers'>
                  <th className='th' id='header-time'>{header[0]}</th>
                  <th className='th' id='header-team'>{header[1]}</th>
                  {slipType.type === 'Straight' || slipType.type === 'Parlay' ?
                    <th className='th' id='header-money'>{header[2]}</th>
                  : <th className='th' id='header-money'></th>}
                  <th className='th' id='header-spread'>{header[3]}</th>
                  <th className='th' id='header-total'>{header[4]}</th>
                </tr>
              </thead>
            : null
            }
          </table>
          {(leagueType === 'GAME LINES' && content.games !== undefined) ?
            <div className='scroll-container'>
              {content.games.map(game => {
                return (
                  <Lines key={game.gameUID} game={game} slipType={slipType} straightArr={straightArr} parlayArr={parlayArr} teaserArr={teaserArr} handleClick={handleClick} />
                );
              })}
            </div>
          : <div className='scroll-container'>empty scroll container</div>
          }
        </div>
      }
    </div>
  );
};

export default LinesContainer;
