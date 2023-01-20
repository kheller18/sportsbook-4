import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faFootballBall, faHockeyPuck, faBasketballBall, faFutbol, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/DashboardBetting.css';

const DashboardBetting = (props) => {
  const [dropdown, showDropdown] = useState(false);
  // const [state, setState] = useState(props.bets.active);
  const [state, setState] = useState({bets: props.bets, type: 'active'});
  console.log(props.bets)
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

  return (
    <div className='dashboard-betting-container'>
      {state.bets.active.map((bet) => {
        return (
          <div className='dashboard-betting-body'>
            {Object.values(bet.slips.keys).map((slip) => {
              console.log(slip)
              return (
                <div>
                  {slip.team} {slip.betType} {slip.line}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
};

export default DashboardBetting;
