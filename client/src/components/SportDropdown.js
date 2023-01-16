import React, { useState } from 'react';
import Button from './Button';
import LeagueDropdown from './LeagueDropdown';
import '../styles/SportDropdown.css';

const SportDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(true);
  const sport = props.sport;
  // console.log(props)

  const handleSportClick = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }

  return (
    <div>
      <Button className={(props.activeSport === sport.name) ? 'sport-button sport-button-active' : 'sport-button'} onClick={handleSportClick}><span className='sport-button-icon'><i className={props.icon}></i>&nbsp;{sport.name}</span>&nbsp;<span className='sport-button-right'><i className={showDropdown ? "fas fa-chevron-circle-up" : "fas fa-chevron-circle-down"}></i></span></Button>
      {
        showDropdown ? (
          // <div className='sport-dropdown'>
          <div>
            {Object.keys(sport.leagues).map((league, i) => {
              if (sport.leagues[`${ league }`]['games']['active'] || sport.leagues[`${ league }`]['props']['active']) {
                return (
                  // <div key={i}>
                    <LeagueDropdown lkey={i} onClick={props.onClick} sport={sport.name} league={league} contents={sport.leagues[`${league}`]} activeSport={props.activeSport} activeLeague={props.activeLeague} />
                  // </div>
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
