import React, { useEffect } from 'react';
import SportDropdown from './SportDropdown';
import '../styles/Nav.css';

const Nav = (props) => {
  // const [sports, setSports] = useState([]);
  // const [sportsBtn, setSportsBtn] = useState('');
  // const [click, setClick] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [navContent, setNavContent] = useState(props.content)

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

  // console.log(props.content)

  // const handleClick = (e, sport, league, type) => {
  //   e.preventDefault();
  //   e.persist();
  //   console.log(e)
  //   console.log(sport)
  //   console.log(league)
  //   console.log(type)
  //   props.passLeagueData({league: league, type: type})
  //   // setSportsBtn(sport);
  //   // setClick(false)
  //   // setIsLoading(false);
  //   // props.passSportData(sport.key);
  // }

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
