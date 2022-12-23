import React, { useState } from 'react';
import Button from './Button';
import LeagueDropdown from './LeagueDropdown';
import '../styles/SportDropdown.css';

const SportDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const sport = props.sport;

  const handleSportClick = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  return (
    <div>
      <Button className={(props.activeSport === sport.name) ? 'nav-button nav-button-active' : 'nav-button'} onClick={handleSportClick}><span className='nav-button-icon'><i className={props.icon}></i>&nbsp;{sport.name}</span>&nbsp;<span className='nav-button-right'><i className={showDropdown ? "fas fa-chevron-circle-up" : "fas fa-chevron-circle-down"}></i></span></Button>
      {
        showDropdown ? (
          <div className='league-dropdown'>
            {Object.keys(sport.leagues).map((league) => {
              if (sport.leagues[`${ league }`]['games']['active'] || sport.leagues[`${ league }`]['props']['active']) {
                return (
                  <LeagueDropdown onClick={props.onClick} sport={sport.name} league={league} contents={sport.leagues[`${league}`]} />
                )
              }
              return (
                <div></div>
              )
            })}
          </div>
        ) : null
      }
    </div>
  );
}

export default SportDropdown;
