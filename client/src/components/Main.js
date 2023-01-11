import React, { useState, useEffect } from 'react';
// import React, {useContext, useState, useEffect} from 'react';
import API from '../utils/API';

import UserDashboard from './UserDashboard';
import BettingArea from './BettingArea';
// import API from '../utils/API;'
import { GlobalContextProvider } from '../utils/GlobalContext';
import '../styles/Main.css';


const Main = (props) => {
  // console.log(props)
  const [state, setState] = useState({});
  // useEffect(() => {
  // }, [])
  console.log(props)

  return (
    <GlobalContextProvider>
      <div className='members-page'>
        <div className='members-section-top'>
          <UserDashboard user={props.location.state.user} bets={props.location.state.bets} />
        </div>
        <div className='members-section-mid'>
          <BettingArea bets={props.location.state.bets} />
        </div>
      </div>
    </GlobalContextProvider>
  );
};

export default Main;
