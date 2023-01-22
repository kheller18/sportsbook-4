import React, { useState } from 'react';
import BetSlipDashboardItem from './BetSlipDashboardItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faFootballBall, faHockeyPuck, faBasketballBall, faFutbol, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/BetSlipDashboard.css';

const BetSlipDashboard = (props) => {
  console.log(props)
  // const [dropdown, showDropdown] = useState(false);
  const [state, setState] = useState(props);
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
    <div className='slip-dashboard-container'>
      <div className='slip-dashboard'>
        <div className='slip-dashboard-title'>
          {state.slip.type}
        </div>
        <div className='slip-dashboard-body'>
          {Object.values(state.slip.slips.keys).map((key) => {
            return (
              <div>
                {/* <FontAwesomeIcon icon={iconClasses[key.icon]}/> {key.team} ML ({key.odds.num}) */}
                <BetSlipDashboardItem bet={key} game={state.games[`${key.gameUID}`]}/>
              </div>
            )
          })}
        </div>
        <div className='slip-dashboard-footer'>
          ${state.slip.payout.toLose} ${state.slip.payout.toWin} ${state.slip.payout.final}
        </div>
      </div>
    </div>
  );
};

export default BetSlipDashboard;
