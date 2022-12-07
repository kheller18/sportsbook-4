import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import API from './API';

const GlobalContext = createContext();
const currentUser = API.getCurrentUser();
let userId = 0;

if (currentUser) {
  userId = currentUser._id;
}

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        // 'sportsbook': 'header-content',
        'x-current-user': userId,
    },
});

export const GlobalContextProvider = (props) => {
    return (
      <GlobalContext.Provider
        value={{
          socket
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
};

GlobalContext.propTypes = {
  children: PropTypes.node,
};

export default GlobalContext;
