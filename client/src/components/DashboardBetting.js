import React, { useState } from 'react';
import BetSlipDashboard from './BetSlipDashboard';
import Button from  './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faFootballBall, faHockeyPuck, faBasketballBall, faFutbol, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/DashboardBetting.css';

const DashboardBetting = (props) => {
  // const [dropdown, showDropdown] = useState(false);
  // const [state, setState] = useState(props.bets.active);
  const [state, setState] = useState({bets: props.bets, games: props.games, type: 'active'});
  // console.log(props.games)
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
  console.log(props)
  return (
    <div>
      {/* <Button className=''></Button> */}
      {state.type === 'active' ? (
        // return (
          <div className='dashboard-betting-container'>
            {state.bets.active.map((slip) => {
              return (
                <div className='dashboard-betting-body'>
                  <BetSlipDashboard games={state.games} slip={slip} />
                </div>
              )
            })}
          </div>
        )
        :
        // return (
          <div className='dashboard-betting-container'>
            {state.bets.completed.map((slip) => {
              return (
                <div className='dashboard-betting-body'>
                  <BetSlipDashboard slip={slip} />
                </div>
              )
            })}
          </div>
        // );
      }
    </div>
  )
}
export default DashboardBetting;
