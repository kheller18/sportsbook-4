import React, { useState } from 'react';
import Button from './Button';
import '../styles/LeagueDropdown.css';

const LeagueDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(true);
  const subContent = props.contents
  const sport = props.sport
  const league = props.league
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

  const handleLeagueClick = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }

  return (
    <div className='league-dropdown2'>
      <Button className='league-button' onClick={handleLeagueClick}>{league}&nbsp;<i className={showDropdown ? "fas fa-chevron-circle-up" : "fas fa-chevron-circle-down"}></i></Button>
      {
        showDropdown ? (
          <div className='dropdown-buttons'>
            {subContent.games.active ?
              <Button key={`${sport}-games`} onClick={(e) => {props.onClick(e, sport, league, 'games')}} className='dropdown-button' id={`${sport}-${league}-games`} value={`${sport}-${league}-games`}>Games</Button>
            : null
            }
          </div>
        ) : null
      }
    </div>
  );
}

export default LeagueDropdown;
