import React, { useEffect } from 'react';
import SportDropdown from './SportDropdown';
import '../styles/Nav.css';

const Nav = (props) => {

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

  const content = props.state;
  // console.log(content)
  useEffect(() => {

  }, []);

  return (
    <div className='nav-container'>
      <div className='nav-header'>
        <div className='nav-title'>AVAILABLE SPORTS</div>
      </div>
      {content.length < 1 ? null :
        <div className='nav-sports-container'>
          {content.map((sport, i) => {
            return (
              <div key={sport.name}>
                <SportDropdown sport={sport} activeSport={props.activeSport} onClick={props.onClick} icon={`${sportClasses[`${sport.name}`]}`} />
              </div>
            )
          })}
        </div>
      }
    </div>
  );
};

export default Nav;
