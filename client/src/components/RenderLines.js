import React, { useContext, useEffect, useState } from 'react';
import { ActiveLinesContext } from './ActiveLines';
import '../styles/RenderLines.css'
import BetSlip from './BetSlip';
import RenderBetSlips from './RenderBetSlips';
import Button from './Button';
export const RenderLinesContext = React.createContext();
import API from '../utils/API';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const RenderLines = (props) => {
  const header = ['TIME', 'TEAM', 'MONEY', 'SPREAD', 'TOTAL'];
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [slipType, setSlipType] = useState({type: "Straight", new: true, special: {value: false, slipID: ''}})
  const [activeBtn, setActiveBtn] = useState({ color: '#EFEFEF' })
  const [parlayArr, setParlayArr] = useState([])
  const [straightArr, setStraightArr] = useState([])
  const [teaserArr, setTeaserArr] = useState([])
  const currTarget = props.league;
  const content = props.state;
  console.log(content.games)
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
  

  const handleClick = (e, game) => {
    e.preventDefault();
    e.persist();

    switch(slipType.type) {
      case 'Straight':
        switch (e.target.value) {
          case 'away-moneyline':
            if (straightArr.includes(game.game.odds.keys.gameMoneylineAwayID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameMoneylineAwayID)
              setStraightArr(newStraightArr)
              // props.passStraightData(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameMoneylineAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: null, odds: game.game.odds.full.gameMoneylineAwayPrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null}, isLoading: true });
            }
            break;
          case 'away-spread':
            if (straightArr.includes(game.game.odds.keys.gameSpreadAwayID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameSpreadAwayID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameSpreadAwayID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadAwayID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameSpreadAwayHandicap), odds: game.game.odds.full.gameSpreadAwayPrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'over':
            if (straightArr.includes(game.game.odds.keys.gameTotalOverID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameTotalOverID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameTotalOverID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameTotalOverID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.awayTeam, line: (game.game.odds.full.gameTotalPoints), odds: game.game.odds.full.gameTotalOverPrice, description: game.game.odds.full.description, type: 'TotalOver', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-moneyline':
            if (straightArr.includes(game.game.odds.keys.gameMoneylineHomeID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameMoneylineHomeID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameMoneylineHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameMoneylineHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: null, odds: game.game.odds.full.gameMoneylineHomePrice, description: game.game.odds.full.description, type: 'Moneyline', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'home-spread':
            if (straightArr.includes(game.game.odds.keys.gameSpreadHomeID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameSpreadHomeID)
              setStraightArr(newStraightArr)
              props.passClickData({ data: game, type: slipType, operation: 'remove', slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            } else {
              setStraightArr([...straightArr, game.game.odds.keys.gameSpreadHomeID])
              props.passClickData({ data: game, type: slipType, slipData: {id: game.game.odds.keys.gameSpreadHomeID, sport: game.game.odds.full.sport, gameUID: game.gameUID, team: game.game.odds.full.homeTeam, line: (game.game.odds.full.gameSpreadHomeHandicap), odds: game.game.odds.full.gameSpreadHomePrice, description: game.game.odds.full.description, type: 'Spread', outcome: null, status: 'Active', payout: null},  isLoading: true });
            }
            break;
          case 'under':
            if (straightArr.includes(game.game.odds.keys.gameTotalUnderID)) {
              newStraightArr = straightArr.filter(bet => bet != game.game.odds.keys.gameTotalUnderID)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
                newParlayArr = parlayArr.filter((bet, id) => id != index)
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
          if (game.game.odds.full.sport === 'Basketball' || game.game.odds.full.sport === 'Hockey') {
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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
                newTeaserArr = teaserArr.filter((bet, id) => id != index)
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

    // const fetchGames = async () => {
    //   setIsLoading(true);
    //   await API.getGames("NHL")
    //     .then(res => {
    //       // console.log(res)
    //       setGames(res.data)
    //       // setIsLoading(false)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    if (removalData.target != '') {
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
    // else {
    //   fetchGames().then(() => {
    //     setIsLoading(false)
    //   })
    // }


  }, [props.removalData]);

  // console.log(games)
/* <i className="fas fa-chevron-circle-up"></i> */
/* <i class="fas fa-spinner"></i> */
    return (
    <div className='container'>
      {isLoading ? '' :
      <div className='game-container'>
        <div className='game-container-header'>
          <div className='render-sport-title'><i className={sportClasses[`${ content.sport }`]}></i>&nbsp;{content.league}</div>
        </div>
        <div className='render-bet-type-buttons'>
          <Button type="button" className={slipType.type === 'Straight' ? 'betTypeBtn betTypeBtnActive' : 'betTypeBtn'} id='straight' onClick={() => handleSlipTypeChange('Straight')}>Straight</Button>
          <Button type="button" className={slipType.type === 'Parlay' ? 'betTypeBtn betTypeBtnActive' : 'betTypeBtn'} id='parlay' onClick={() => handleSlipTypeChange('Parlay')}>Parlay</Button>
          <Button type="button" className={slipType.type === 'Teaser' ? 'betTypeBtn betTypeBtnActive' : 'betTypeBtn'} id='teaser' onClick={() => handleSlipTypeChange('Teaser')}>Teaser</Button>
        </div>
        <table className='table'>
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
        </table>
          <div className='scroll-container'>
            {content.games.map(game => {
              return (
                <table key={game.gameUID} className='render-main-body'>
                  <tbody>
                    <tr key={game.gameUID}>
                      <td className='render-away-row'>
                        <table className='render-sub-body'>
                          <tbody>
                            <tr>
                              <td className='render-team'>{game.game.odds.full.awayTeam}</td>
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='away-moneyline'
                                    value='away-moneyline'
                                  >
                                    {game.game.odds.full.gameMoneylineAwayPrice} <i className="fas fa-chart-line"></i>
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='away-moneyline'
                                    value='away-moneyline'
                                  >
                                    {game.game.odds.full.gameMoneylineAwayPrice}
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'></td>
                              : null
                              }
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='away-spread'
                                    value='away-spread'
                                  >
                                    {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='away-spread'
                                    value='away-spread'
                                  >
                                    {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={teaserArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='away-spread'
                                    value='away-spread'
                                  >
                                    {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='over'
                                    value='over'
                                  >
                                    O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='over'
                                    value='over'
                                  >
                                    O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={teaserArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='over'
                                    value='over'
                                  >
                                    O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
                                  </Button>
                                </td>
                              : null
                              }
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className='render-gametime-row'>
                        <table className='render-gametime'>
                          <tbody>
                            <tr>
                              <td>{game.game.odds.full.startDate}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table className='render-sub-body'>
                          <tbody>
                            <tr>
                              <td className='render-team'>{game.game.odds.full.homeTeam}</td>
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='home-moneyline'
                                    value='home-moneyline'
                                  >
                                    {game.game.odds.full.gameMoneylineHomePrice}
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='home-moneyline'
                                    value='home-moneyline'
                                  >
                                    {game.game.odds.full.gameMoneylineHomePrice}
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'></td>
                              : null
                              }
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='home-spread'
                                    value='home-spread'
                                  >
                                    {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='home-spread'
                                    value='home-spread'
                                  >
                                    {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={teaserArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='home-spread'
                                    value='home-spread'
                                  >
                                    {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Straight' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={straightArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='under'
                                    value='under'
                                  >
                                    U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Parlay' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={parlayArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='under'
                                    value='under'
                                  >
                                    U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
                                  </Button>
                                </td>
                              : null
                              }
                              {slipType.type === 'Teaser' ? 
                                <td className='render-button'>
                                  <Button
                                    onClick={(e) => handleClick(e, game)}
                                    className={teaserArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                                    id='under'
                                    value='under'
                                  >
                                    U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
                                  </Button>
                                </td>
                              : null
                              }
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
      </div>
      }
    </div>
  );



  // return (
  //   <div className='container'>
  //     {isLoading ? '' :
  //     <div className='game-container'>
  //       <div className='game-container-header'>
  //         <div className='render-sport-title'><i className={sportClasses[`${ games[0].game.odds.full.sport }`]}></i>&nbsp;{games[0].game.odds.full.league}</div>
  //         <div className='render-bet-type-buttons'>
  //           <button type="button" className='betTypeBtn' id='straight' onClick={() => handleSlipTypeChange('Straight')}>Straight</button>
  //           <button type="button" className='betTypeBtn' id='parlay' onClick={() => handleSlipTypeChange('Parlay')}>Parlay</button>
  //           <button type="button" className='betTypeBtn' id='teaser' onClick={() => handleSlipTypeChange('Teaser')}>Teaser</button>
  //         </div>
  //       </div>
  //       {/* <i class="fas fa-spinner"></i> */}
  //       {/* <button type="button" className='betTypeBtn' id='new-parlay' onClick={() => handleSlipTypeChange('Parlay')}>New Parlay</button> */}
  //       {slipType.type}
  //       <table className='table'>
  //         <thead>
  //           <tr className='table-headers'>
  //             <th className='th' id='header-time'>{header[0]}</th>
  //             <th className='th' id='header-team'>{header[1]}</th>
  //             {slipType.type === 'Straight' || slipType.type === 'Parlay' ?
  //               <th className='th' id='header-money'>{header[2]}</th>
  //             : <th className='th' id='header-money'></th>}
  //             <th className='th' id='header-spread'>{header[3]}</th>
  //             <th className='th' id='header-total'>{header[4]}</th>
  //           </tr>
  //         </thead>
  //       </table>
  //         <div className='scroll-container'>
  //           {games.map(game => {
  //             return (
  //               <table key={game.gameUID} className='render-main-body'>
  //                 <tbody>
  //                   <tr key={game.gameUID}>
  //                     <td className='render-away-row'>
  //                       <table className='render-sub-body'>
  //                         <tbody>
  //                           <tr>
  //                             <td className='render-team'>{game.game.odds.full.awayTeam}</td>
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn' : ''}
  //                                   id='away-moneyline'
  //                                   value='away-moneyline'
  //                                 >
  //                                   {game.game.odds.full.gameMoneylineAwayPrice}
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn' : ''}
  //                                   id='away-moneyline'
  //                                   value='away-moneyline'
  //                                 >
  //                                   {game.game.odds.full.gameMoneylineAwayPrice}
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'></td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn' : ''}
  //                                   id='away-spread'
  //                                   value='away-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn' : ''}
  //                                   id='away-spread'
  //                                   value='away-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={teaserArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn' : ''}
  //                                   id='away-spread'
  //                                   value='away-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn' : ''}
  //                                   id='over'
  //                                   value='over'
  //                                 >
  //                                   O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn' : ''}
  //                                   id='over'
  //                                   value='over'
  //                                 >
  //                                   O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={teaserArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn' : ''}
  //                                   id='over'
  //                                   value='over'
  //                                 >
  //                                   O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                           </tr>
  //                         </tbody>
  //                       </table>
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td className='render-gametime-row'>
  //                       <table className='render-gametime'>
  //                         <tbody>
  //                           <tr>
  //                             <td>{game.game.odds.full.startDate}</td>
  //                           </tr>
  //                         </tbody>
  //                       </table>
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       <table className='render-sub-body'>
  //                         <tbody>
  //                           <tr>
  //                             <td className='render-team'>{game.game.odds.full.homeTeam}</td>
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn' : ''}
  //                                   id='home-moneyline'
  //                                   value='home-moneyline'
  //                                 >
  //                                   {game.game.odds.full.gameMoneylineHomePrice}
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn' : ''}
  //                                   id='home-moneyline'
  //                                   value='home-moneyline'
  //                                 >
  //                                   {game.game.odds.full.gameMoneylineHomePrice}
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'></td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn' : ''}
  //                                   id='home-spread'
  //                                   value='home-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn' : ''}
  //                                   id='home-spread'
  //                                   value='home-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={teaserArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn' : ''}
  //                                   id='home-spread'
  //                                   value='home-spread'
  //                                 >
  //                                   {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Straight' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={straightArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn' : ''}
  //                                   id='under'
  //                                   value='under'
  //                                 >
  //                                   U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Parlay' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={parlayArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn' : ''}
  //                                   id='under'
  //                                   value='under'
  //                                 >
  //                                   U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                             {slipType.type === 'Teaser' ? 
  //                               <td className='render-button'>
  //                                 <Button
  //                                   onClick={(e) => handleClick(e, game)}
  //                                   className={teaserArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn' : ''}
  //                                   id='under'
  //                                   value='under'
  //                                 >
  //                                   U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
  //                                 </Button>
  //                               </td>
  //                             : null
  //                             }
  //                           </tr>
  //                         </tbody>
  //                       </table>
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //             );
  //           })}
  //         </div>
  //     </div>
  //     }
  //   </div>
  // );
};

export default RenderLines;
