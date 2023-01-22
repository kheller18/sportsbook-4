import React, { useState } from 'react';
import Scores from './Scores';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faFootballBall, faHockeyPuck, faBasketballBall, faFutbol, faChevronCircleUp, faChevronCircleDown, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/BetSlipDashboardItem.css';

const BetSlipDashboardItem = (props) => {
  const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState({bet: props.bet, game: props.game, dropdown: false});
  console.log(props)
  // if (state.game.results.full.scores !== undefined) {
  //   // console.log(state.game.results.full.scores)
  // }
  const iconClasses = {
    'Baseball': 'fa-baseball-ball',
    'fas fa-football-ball': faFootballBall,
    'fas fa-futbol': faFutbol,
    'fas fa-hockey-puck': faHockeyPuck,
    'Golf': 'fa-golf-ball',
    'Tennis': 'fa-table-tennis',
    'MMA': 'fa-user-ninja',
    'fas fa-basketball-ball': faBasketballBall
  }

  const handleClick = (e) => {
    (state.dropdown) ? setState((prevState) => ({...prevState, dropdown: false}))
    : setState((prevState) => ({...prevState, dropdown: true}))
  }

  switch (state.bet.betType) {
    case 'Moneyline':
      return (
        <div className='betslip-db-container'>
          <div className='betslip-db-container-header'>
            <FontAwesomeIcon icon={iconClasses[state.bet.icon]}/> {state.bet.team} ML ({state.bet.odds.num})
            <Button
              onClick={handleClick}
              className='betslip-db-container-dropdown'
            >
              <FontAwesomeIcon icon={(state.dropdown) ? faChevronCircleUp : faChevronCircleDown} />
            </Button>
          </div>
          {state.dropdown ?
            <div>
              <Scores score={state.game}/>
            </div>
          : null
          }
        </div>
      )
    case 'Spread':
      return (
        <div className='betslip-db-container'>
          <div className='betslip-db-container-header'>
            <FontAwesomeIcon icon={iconClasses[state.bet.icon]}/> {state.bet.team} {state.bet.line} ({state.bet.odds.num})
            <Button
              onClick={handleClick}
              className='betslip-db-container-dropdown'
            >
              <FontAwesomeIcon icon={(state.dropdown) ? faChevronCircleUp : faChevronCircleDown} />
            </Button>
          </div>
          {state.dropdown ?
            <div>
              <Scores score={state.game}/>
            </div>
          : null
          }
        </div>
      )
    case 'TotalOver':
      return (
        <div className='betslip-db-container'>
          <div className='betslip-db-container-header'>
            <FontAwesomeIcon icon={iconClasses[state.bet.icon]}/> {state.bet.teams.away} vs. {state.bet.teams.home} Over {state.bet.line} ({state.bet.odds.num})
          <Button
              onClick={handleClick}
              className='betslip-db-container-dropdown'
            >
              <FontAwesomeIcon icon={(state.dropdown) ? faChevronCircleUp : faChevronCircleDown} />
            </Button>
          </div>
          {state.dropdown ?
            <div>
              <Scores score={state.game}/>
            </div>
          : null
          }
        </div>
      )
    case 'TotalUnder':
      return (
        <div className='betslip-db-container'>
          <div className='betslip-db-container-header'>
          <FontAwesomeIcon icon={iconClasses[state.bet.icon]}/> {state.bet.teams.away} vs. {state.bet.teams.home} Under {state.bet.line} ({state.bet.odds.num})
          <Button
              onClick={handleClick}
              className='betslip-db-container-dropdown'
            >
              <FontAwesomeIcon icon={(state.dropdown) ? faChevronCircleUp : faChevronCircleDown} />
            </Button>
          </div>
          {state.dropdown ?
            <div>
              <Scores score={state.game}/>
            </div>
          : null
          }
        </div>
      )
    default:
      return null
  }
};

export default BetSlipDashboardItem;
