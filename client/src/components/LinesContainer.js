import React, { useEffect, useState } from 'react';
import '../styles/LinesContainer.css'
// import BetSlip from './BetSlip';
import PropsContainer from './PropsContainer';
import Button from './Button';
// import API from '../utils/API';
import Lines from './Lines';
// import Props from './Props';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* <i className="fas fa-chevron-circle-up"></i> */
/* <i class="fas fa-spinner"></i> */
//  <i className="fas fa-chart-line"></i>


const LinesContainer = (props) => {
  const header = ['TIME', 'TEAM', 'MONEYLINE', 'SPREAD', 'TOTAL'];
  // const playerPropsHeader = ['PLAYER', 'UNDER', 'LINE', 'OVER'];
  // const [games, setGames] = useState([])
  // const [currHeader, setCurrHeader] = useState(['TIME', 'TEAM', 'MONEY', 'SPREAD', 'TOTAL'])
  const [isLoading, setIsLoading] = useState(false);
  const [slipType, setSlipType] = useState({type: "Straight", new: true, special: {value: false, slipID: ''}})
  // const [activeBtn, setActiveBtn] = useState({ color: '#EFEFEF' })
  const [parlayArr, setParlayArr] = useState([])
  const [leagueType, setLeagueType] = useState('GAME LINES')
  const [straightArr, setStraightArr] = useState([])
  const [teaserArr, setTeaserArr] = useState([])
  // const [slipTypeArr, setSlipTypeArr] = useState({straight: [], teaser: [], parlay: []})
  // const currTarget = props.league;
  const content = props.state;
  const sport = content.sport;
  // console.log(sport)
  console.log(content)
  // console.log(currTarget)
  // const sportsLines = props.data;
  const removalData = props.removalData
  // const content = props.content.leagues;
  // console.log(content)
  let index;
  let newStraightArr;
  let newTeaserArr;
  let newParlayArr;

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

  const handlePropClick = (e, player, propType, game) => {
    e.preventDefault();
    console.log(player[0])
    console.log(player[1])

    switch (slipType.type) {
      case 'Straight':
        switch (e.target.value) {
          case 'player-under':
            if (straightArr.includes(player[1].Under.id)) {
              newStraightArr = straightArr.filter(bet => bet !== player[1].Under.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
            } else {
              setStraightArr([...straightArr, player[1].Under.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
            }

            break;

          case 'player-over':
            if (straightArr.includes(player[1].Over.id)) {
              newStraightArr = straightArr.filter(bet => bet !== player[1].Over.id)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
            } else {
              setStraightArr([...straightArr, player[1].Over.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
            }

            break;

          default:
            console.log('not inside player unde or over')
        }
        break;

      case 'Parlay':
        if (slipType.new) {
          // setParlayArr([]);
          switch (e.target.value) {
            case 'player-under':
              setParlayArr([player[1].Under.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              break;

            case 'player-over':
              setParlayArr([player[1].Over.id])
              props.passClickData({ data: game, type: slipType, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              break;

            default:
              console.log('incorrect choice')
          }
          setSlipType({type: 'Parlay', new: false, special: {value: false, slipID: ''}})
        } else if (slipType.special.value === true) {
          switch (e.target.value) {
            case 'player-under':
              if (parlayArr.includes(player[1].Over.id)) {
                console.log('included')
              } else if (parlayArr.includes(player[1].Under.id)) {
                index = parlayArr.indexOf(player[1].Under.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, player[1].Under.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;

            case 'player-over':
              if (parlayArr.includes(player[1].Under.id)) {
                console.log('included')
              } else if (parlayArr.includes(player[1].Over.id)) {
                index = parlayArr.indexOf(player[1].Over.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, player[1].Over.id])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;

            default:
            break;
          }

        } else {
          switch (e.target.value) {
            case 'player-under':
              if (parlayArr.includes(player[1].Over.id)) {
                console.log('included')
              } else if (parlayArr.includes(player[1].Under.id)) {
                index = parlayArr.indexOf(player[1].Under.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, player[1].Under.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: player[1].Under.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Under.name, line: player[1].Under.line, odds: player[1].Under.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'player-over':
              if (parlayArr.includes(player[1].Under.id)) {
                console.log('included')
              } else if (parlayArr.includes(player[1].Over.id)) {
                index = parlayArr.indexOf(player[1].Over.id)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, player[1].Over.id])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: player[1].Over.id, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: player[1].Over.name, line: player[1].Over.line, odds: player[1].Over.odds, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            default:
              break;
          }
        }

        break;

      default:
        console.log('incorrect sliptype handle prop click')
    }
  }


  const handleClick = (e, game) => {
    e.preventDefault();
    e.persist();

    switch(slipType.type) {
      case 'Straight':
        switch (e.target.value) {
          case 'away-moneyline':
            if (straightArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameMoneylineAwayID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameMoneylineAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            }
            break;
          case 'away-spread':
            if (straightArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameSpreadAwayID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameSpreadAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'over':
            if (straightArr.includes(game.game.odds.keys.gameTotalOverID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameTotalOverID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameTotalOverID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-moneyline':
            if (straightArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameMoneylineHomeID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameMoneylineHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-spread':
            if (straightArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameSpreadHomeID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameSpreadHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'under':
            if (straightArr.includes(game.game.odds.keys.gameTotalUnderID)) {
              newStraightArr = straightArr.filter(bet => bet !== game.game.odds.keys.gameTotalUnderID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameTotalUnderID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
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
          switch (e.target.value) {
            case 'away-moneyline':
              setParlayArr([game.game.odds.keys.gameMoneylineAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: false });
              break;
            case 'away-spread':
              setParlayArr([game.game.odds.keys.gameSpreadAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'over':
              setParlayArr([game.game.odds.keys.gameTotalOverID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'home-moneyline':
              setParlayArr([game.game.odds.keys.gameMoneylineHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'home-spread':
              setParlayArr([game.game.odds.keys.gameSpreadHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            case 'under':
              setParlayArr([game.game.odds.keys.gameTotalUnderID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
              break;
            default:
              console.log('None selected.')
              break;
          };
          setSlipType({type: 'Parlay', new: false, special: {value: false, slipID: ''}})
        } else if (slipType.special.value === true) {
          switch (e.target.value) {
            case 'away-moneyline':
              if (parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameMoneylineAwayID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameMoneylineAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;

            case 'away-spread':
              if (parlayArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameSpreadAwayID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'over':
              if (parlayArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameTotalOverID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameTotalOverID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'home-moneyline':
              if (parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameMoneylineHomeID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameMoneylineHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'home-spread':
              if (parlayArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameSpreadHomeID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'under':
              if (parlayArr.includes(game.game.odds.keys.gameTotalOverID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameTotalUnderID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('special default')
              break;
          }
        } else {
          switch (e.target.value) {
            case 'away-moneyline':
              if (parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameMoneylineAwayID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameMoneylineAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
              }
              break;
            case 'away-spread':
              if (parlayArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameSpreadAwayID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'over':
              if (parlayArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameTotalOverID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameTotalOverID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-moneyline':
              if (parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameMoneylineHomeID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameMoneylineHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (parlayArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameSpreadHomeID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (parlayArr.includes(game.game.odds.keys.gameTotalOverID)) {
                console.log('included')
              } else if (parlayArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                index = parlayArr.indexOf(game.game.odds.keys.gameTotalUnderID)
                newParlayArr = parlayArr.filter((bet, id) => id !== index)
                if (newParlayArr.length < 1) {
                  setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
                }
                setParlayArr(newParlayArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setParlayArr([...parlayArr, game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
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
                setTeaserArr([game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'over':
                setTeaserArr([game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'home-spread':
                setTeaserArr([game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'under':
                setTeaserArr([game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, teaserVal: '4', type: slipType, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              default:
                console.log('None selected.')
                break;
            };
          } else {
            switch (e.target.value) {
              case 'away-spread':
                setTeaserArr([game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'over':
                setTeaserArr([game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'home-spread':
                setTeaserArr([game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: false });
                break;
              case 'under':
                setTeaserArr([game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, teaserVal: '6', type: slipType, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: false });
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
              if (teaserArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameSpreadAwayID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;

            case 'over':
              if (teaserArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameTotalOverID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameTotalOverID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (teaserArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameSpreadHomeID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (teaserArr.includes(game.game.odds.keys.gameTotalOverID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameTotalUnderID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, type: slipType, special: {value: slipType.special.value, slipID: slipType.special.slipID}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            default:
              console.log('None selected.')
              break;
          }
        } else {
          switch (e.target.value) {
            case 'away-spread':
              if (teaserArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameSpreadAwayID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameSpreadAwayID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameSpreadAwayHandicap, odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'over':
              if (teaserArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameTotalOverID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameTotalOverID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameTotalOverID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'home-spread':
              if (teaserArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameSpreadHomeID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameSpreadHomeID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameSpreadHomeHandicap, odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
              }
              break;
            case 'under':
              if (teaserArr.includes(game.game.odds.keys.gameTotalOverID)) {
                console.log('included')
              } else if (teaserArr.includes(game.game.odds.keys.gameTotalUnderID)) {
                index = teaserArr.indexOf(game.game.odds.keys.gameTotalUnderID)
                newTeaserArr = teaserArr.filter((bet, id) => id !== index)
                if (newTeaserArr.length < 1) {
                  setSlipType({type: 'Teaser', new: true, special: {value: false, slipID: ''}})
                }
                setTeaserArr(newTeaserArr)
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'remove', index: index}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
              } else {
                setTeaserArr([...teaserArr, game.game.odds.keys.gameTotalUnderID])
                props.passClickData({ data: game, type: slipType, special: {value: false}, operation: {type: 'add'}, slipData: {id: game.game.odds.keys.gameTotalUnderID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: game.game.odds.full.gameTotalPoints, odds: game.game.odds.full.gameTotalUnderPrice, description: game.game.odds.full.description, type: 'TotalUnder', outcome: null, status: 'Active', payout: null},  isLoading: true });
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
          newStraightArr = straightArr.filter((bet) => bet != removalData.target)
          setStraightArr(newStraightArr)
          break;

        case 'Parlay':
          if (removalData.operation === 'delete') {
            setParlayArr([])
            if (slipType.type === 'Parlay') {
              setSlipType({type: 'Parlay', new: true, special: {value: false, slipID: ''}})
            }
          } else {
            newParlayArr = parlayArr.filter((bet) => bet != removalData.target)
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
            newTeaserArr = teaserArr.filter((bet) => bet != removalData.target)
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

  return (
    <div className='container'>
      {isLoading ? '' :
      <div className='game-container'>
        <div className='game-container-header'>
          <div className='render-sport-title'><i className={sportClasses[`${ content.sport }`]}></i>&nbsp;{content.league}&nbsp;<span className='sport-title-subheader'>GAME LINES</span></div>
          <div className='render-league-type'>
            <Button type="button" className={leagueType === 'GAME LINES' ? 'leagueTypeBtn leagueTypeBtnActive' : 'leagueTypeBtn'} onClick={() => setLeagueType('GAME LINES')} id='game-lines'>GAME LINES</Button>
            <Button type="button" className={leagueType === 'PLAYER PROPS' ? 'leagueTypeBtn leagueTypeBtnActive' : 'leagueTypeBtn'} onClick={() => setLeagueType('PLAYER PROPS')} id='player-props'>PLAYER PROPS</Button>
          </div>
        </div>
        {((leagueType === 'GAME LINES') && ((sport === 'Basketball') || (sport === 'Football'))) ?
          <div className='render-bet-type-buttons'>
            <Button type="button" className={slipType.type === 'Straight' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='straight' onClick={() => handleSlipTypeChange('Straight')}>STRAIGHT</Button>
            <Button type="button" className={slipType.type === 'Parlay' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='parlay' onClick={() => handleSlipTypeChange('Parlay')}>PARLAY</Button>
            <Button type="button" className={slipType.type === 'Teaser' ? 'betTypeBtn betTypeBtnThree betTypeBtnActive' : 'betTypeBtn betTypeBtnThree'} id='teaser' onClick={() => handleSlipTypeChange('Teaser')}>TEASER</Button>
          </div>
        :
          <div className='render-bet-type-buttons'>
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
        {leagueType === 'GAME LINES' ?
          <div className='scroll-container'>
            {content.games.map(game => {
              return (
                <Lines game={game} slipType={slipType} straightArr={straightArr} parlayArr={parlayArr} teaserArr={teaserArr} handleClick={handleClick} />
              );
            })}
          </div>
        : null
        }
        {leagueType === 'PLAYER PROPS' ?
          <div className='scroll-container'>
            <PropsContainer games={content.games} handlePropClick={handlePropClick} slipType={slipType} straightArr={straightArr} parlayArr={parlayArr} teaserArr={teaserArr}/>
            {/* {content.games.map((game, i) => {
              if ((typeof game.game.props !== undefined)) {
                if (i === 0) {
                  return (
                    <Props game={game} slipType={slipType} straightArr={straightArr} parlayArr={parlayArr} teaserArr={teaserArr} handlePropClick={handlePropClick} show={true} />
                  );
                } else {
                  return (
                    <Props game={game} slipType={slipType} straightArr={straightArr} parlayArr={parlayArr} teaserArr={teaserArr} handlePropClick={handlePropClick} show={false}/>
                  );
                }
              }
            })} */}
          </div>
        : null
        }
      </div>
      }
    </div>
  );
};

export default LinesContainer;
