import React, { useState } from 'react';
import Button from './Button';
import '../styles/LeagueDropdown.css';

const LeagueDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(true)
  // const [gamesVal, setGamesVal] = useState()
  // console.log(props)
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
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  return (
    <div>
      <Button onClick={handleLeagueClick}>{league}&nbsp;<i className={showDropdown ? "fas fa-chevron-circle-up" : "fas fa-chevron-circle-down"}></i></Button>
      {
        showDropdown ? (
          <div className='dropdown-buttons'>
            {subContent.games.active ?
              <Button key={`${sport}-games`} onClick={(e) => {props.onClick(e, sport, league, 'games')}} id={`${sport}-${league}-games`} value={`${sport}-${league}-games`}>Games</Button>
            : null
            }
            {subContent.props.active ?
              <Button key={`${sport}-props`} id={`${sport}-${league}-props`} value={`${sport}-${league}-props`}>Props</Button>
            : null
            }
          </div>
        ) : null
      }
    </div>
  );
}

export default LeagueDropdown;
