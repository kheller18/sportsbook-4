import React, { useEffect, useState, useContext } from 'react';
import BetSlipContainer from './BetSlipContainer';
import Nav from './Nav';
import GlobalContext from '../utils/GlobalContext';
import LinesContainer from './LinesContainer';
import UserDashboard from './UserDashboard';
import API from '../utils/API';
import '../styles/BettingArea.css';

const BettingArea = (props) => {
  const [clickData, setClickData] = useState("")
  const [removalData, setRemovalData] = useState({target: '', type: '', operation: '', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
  const [league, setLeague] = useState('NHL');
  const [state, setState] = useState({sport: 'Football', league: 'NFL', type: 'games', games: [], navData: [], siteData: [], isLoading: true})
  // const [ex, setEx] = useState('')
  // const [user, setUser] = useState({user: props.user, bets: props.bets});
  const [user, setUser] = useState(
    {
      user: props.user,
      bets: {active: props.bets.filter(bet => bet.status === "Active"), completed: props.bets.filter(bet => bet.status === "Completed")}
    }
  );
  const { socket } = useContext(GlobalContext);
  // console.log(props.bets)
  // console.log(socket)
  console.log(user.bets)
  socket.on('package', (data) => {
    console.log(data)
    socket.off('package')
    setState((prevState) => ({
      sport: prevState.sport,
      league: prevState.league,
      type: prevState.type,
      games: data.gameData.leagues[`${ prevState.league }`],
      navData: data.navData,
      siteData: data.gameData,
      scores: data.liveGames,
      isLoading: false
    }))
    if (data.userData !== undefined) {
      console.log(user)
      setUser((prevUser) => ({
        bets: {
        ...prevUser.bets,
        },
        user: {
          ...prevUser.user,
          account_value: {
            current: data.userData.account_value.current,
            pending: data.userData.account_value.pending
          }
          // 'account_value.current': data.userData.account_value.current,
          // user.account_value.pending: data.userData.account_value.pending
        }
      }))
    }
  })

  // socket.on('user', (data) => {
  //   console.log(data)
  //   socket.off('user')
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     'user.account_value.current': data.userData.account_value.current,
  //     'user.account_value.pending': data.account_value.pending
  //   }))
  // })

  const handleClick = (e, sport, league, type) => {
    e.preventDefault();
    e.persist();
    // console.log(type)
    console.log(league)
    setState((prevState) => ({
      ...prevState,
      sport: sport,
      league: league,
      games: prevState.siteData.leagues[`${ league }`]
    }))
  }

  // const getUser = () => {
  //   API.getUser(user.user.user_id).then((newUser) => {
  //     console.log(newUser);
  //     setUser((oldUser) => ({
  //       ...oldUser,
  //       'user.account_value.current': newUser.data.account_value.current,
  //       'user.account_value.pending': newUser.data.account_value.pending,
  //     }))
  //   }).catch(err => {console.log(err)})
  //   setTimeout(getUser, 10000)
  // }

  // getUser()
  useEffect(() => {
    // get socket data here one time on login and then never run again
    // console.log(socket)
    // socket.emit('package')
    // const activeBets = props.
    socket.emit('package', (user.user))
    // socket.emit('user', (user.user))
    // socket.on('package', (data) => {
    //   console.log(data)
    //   socket.off('package')
    //   setState((prevState) => ({
    //     sport: prevState.sport,
    //     league: prevState.league,
    //     type: prevState.type,
    //     games: data.gameData.leagues[`${ prevState.league }`],
    //     navData: data.navData,
    //     siteData: data.gameData,
    //     isLoading: false
    //   }))
    // })
  }, [socket])
// }, [socket])

  console.log(user)
  return (
    // <div className='betting-area-container'>
    //   {state.isLoading ? null :
    //     <div className='betting-container'>
    //       <Nav onClick={handleClick} activeLeague={state.league} activeSport={state.sport} state={state.navData} passLeagueData={setLeague} />
    //       <LinesContainer state={state} removalData={removalData} passClickData={setClickData} />
    //       <BetSlipContainer data={clickData} setEx={setEx} passRemovalData={setRemovalData} slips={props.bets} />
    //     </div>
    //   }
    // </div>
    <div className='complete-container'>
      <div className='complete-container-top'>
        {/* <UserDashboard user={user} bets={props.bets} /> */}
        <UserDashboard user={user} games={state.scores} />
      </div>
      <div className='betting-area-container'>
      {state.isLoading ? null :
        <div className='betting-container'>
          <Nav onClick={handleClick} activeLeague={state.league} activeSport={state.sport} state={state.navData} passLeagueData={setLeague} />
          <LinesContainer state={state} removalData={removalData} passClickData={setClickData} />
          <BetSlipContainer data={clickData} passRemovalData={setRemovalData} slips={user.bets} setUser={setUser} />
        </div>
      }
      </div>
  </div>

  );
};

export default BettingArea;
