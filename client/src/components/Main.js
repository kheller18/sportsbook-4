import React from 'react';
// import React, {useContext, useState, useEffect} from 'react';
import UserDashboard from './UserDashboard';
import BettingArea from './BettingArea';
import { GlobalContextProvider } from '../utils/GlobalContext';
import '../styles/Main.css';


const Main = () => {

  return (
    <GlobalContextProvider>
      <div className='members-page'>
        <div className='members-section-top'>
          <UserDashboard />
        </div>
        <div className='members-section-mid'>
          <BettingArea />
        </div>
      </div>
    </GlobalContextProvider>
  );
};

export default Main;
