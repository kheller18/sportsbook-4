import React, { useEffect, useState, useContext } from 'react';
import BetSlipContainer from './BetSlipContainer';
import Nav from './Nav';
import GlobalContext from '../utils/GlobalContext';
import LinesContainer from './LinesContainer';
import '../styles/BettingArea.css';

const BettingArea = (props) => {
  const [clickData, setClickData] = useState("")
  const [removalData, setRemovalData] = useState({target: '', type: '', operation: '', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
  const [league, setLeague] = useState('NHL')
  const [state, setState] = useState({sport: 'Football', league: 'NFL', type: 'games', games: [], navData: [], siteData: [], isLoading: true})
  const { socket } = useContext(GlobalContext);

  socket.on('package', (data) => {
    // console.log(data)
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
    // console.log(type)
    setState((prevState) => ({
      ...prevState,
      sport: sport,
      league: league,
      games: prevState.siteData.leagues[`${ league }`]
    }))
  }

  useEffect(() => {
    // get socket data here one time on login and then never run again
    socket.emit('package')

  }, [])

  return (
    <div className='betting-area-container'>
      {state.isLoading ? null :
        <div className='betting-container'>
          <Nav onClick={handleClick} activeSport={state.sport} state={state.navData} passLeagueData={setLeague} />
          <LinesContainer state={state} removalData={removalData} passClickData={setClickData} />
          <BetSlipContainer data={clickData} passRemovalData={setRemovalData} slips={props.bets} />
        </div>
      }
    </div>
  );
};

export default BettingArea;
