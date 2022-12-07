import React, {useContext, useState, useEffect} from 'react';
import UserDashboard from './UserDashboard';
import BettingArea from './BettingArea';
// import GlobalContext from '../utils/GlobalContext';
import { GlobalContextProvider } from '../utils/GlobalContext';
import '../styles/Main.css';


const Main = () => {
  const [sport, setSport] = useState('basketball_nba');
  const [isLoading, setIsLoading] = useState(true)
  // const { socket } = useContext(GlobalContext);
  // const socket = useContext(GlobalContext);
  // console.log(socket)
  // const io = require('socket.io-client')
  // const socket = io({})

  // socket.on("connect", () => {
  //   socket.send("hello")

  //   socket.emit("hello there")
  // })

  // const games = useContext(GamesContext);
  // console.log(games);

  return (
    <GlobalContextProvider>
      <div className='members-page'>
        {/* <div className='members-section-top'>
          <UserDashboard />
        </div> */}
        <div className='members-section-mid'>
          {/* <Nav passSportData={setSport} passIsLoading={setIsLoading} /> */}
          {/* <ActiveGames data={{sport: sport, loading: isLoading}} passClickData={setClickData} /> */}
          {/* <RenderBetSlips data={clickData} /> */}
          {/* <BettingArea data={{sport: sport, loading: isLoading}} /> */}
          <BettingArea />
          {/* <BetSlipContainer data={clickData} updateClickData={setClickData} /> */}
        </div>
        {/* <BetSlip /> */}
      </div>
    </GlobalContextProvider>
  );
};

export default Main;
