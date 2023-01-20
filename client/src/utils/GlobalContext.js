import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import API from './API';

const GlobalContext = createContext();
const currentUser = API.getCurrentUser();
let user_id = 0;

if (currentUser) {
  user_id = currentUser.user_id;
  console.log(user_id)
}

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        // 'sportsbook': 'header-content',
        'x-current-user': user_id,
    },
});

export const GlobalContextProvider = (props) => {
    return (
      <GlobalContext.Provider
        value={{
          socket,
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
