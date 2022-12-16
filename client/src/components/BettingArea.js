import React, { useEffect, useState, useContext } from 'react';
import BetSlipContainer from './BetSlipContainer';
import Nav from './Nav';
import '../styles/BettingArea.css';
import GlobalContext from '../utils/GlobalContext';
import LinesContainer from './LinesContainer';


const BettingArea = (props) => {
  // console.log(props)
  // const [isLoading, setIsLoading] = useState(true)
  const [clickData, setClickData] = useState("")
  const [removalData, setRemovalData] = useState({target: '', type: '', operation: '', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
  // const [retroactiveData, setRetroactiveData] = useState()
  // const [nav, setNav] = useState([]);
  // const [sport, setSport] = useState('basketball_nba');
  const [league, setLeague] = useState('NHL')
  const [state, setState] = useState({sport: 'Football', league: 'NFL', type: 'games', games: [], navData: [], siteData: [], isLoading: true})
  // const [targetGames, setTargetGames] = useState([])
  // const [siteData, setSiteData] = useState([]);
  // const [navData, setNavData] = useState([])
  const { socket } = useContext(GlobalContext);

  socket.on('package', (data) => {
    socket.off('package')
    setState((prevState) => ({
      sport: prevState.sport,
      league: prevState.league,
      type: prevState.type,
      games: data.gameData.leagues[`${ prevState.league }`],
      navData: data.navData,
      siteData: data.gameData,
      isLoading: false
    }))
  })

  const handleClick = (e, sport, league, type) => {
    e.preventDefault();
    e.persist();
    console.log(type)
    setState((prevState) => ({
      ...prevState,
      sport: sport,
      league: league,
      games: prevState.siteData.leagues[`${ league }`]
    }))
  }

  useEffect(() => {


  }, [])

  return (
    <div>
      {state.isLoading ? null :
        <div className='betting-container'>
          <Nav onClick={handleClick} activeSport={state.sport} state={state.navData} passLeagueData={setLeague} />
          <LinesContainer state={state} removalData={removalData} passClickData={setClickData} />
          <BetSlipContainer data={clickData} passRemovalData={setRemovalData} />
        </div>
      }
    </div>
    /* <div className='betting-container'>
        <Nav onClick={handleClick} activeSport={state.sport} state={state.navData} passLeagueData={setLeague} />
      }
      {state.isLoading ? null :
        // <RenderLines state={state} removalData={removalData} passClickData={setClickData} />
        <LinesContainer state={state} removalData={removalData} passClickData={setClickData} />
      }
      <BetSlipContainer data={clickData} passRemovalData={setRemovalData} />
    </div> */
  );
};

export default BettingArea;
