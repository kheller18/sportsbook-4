/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const mongoose = require('mongoose')

export default {
  // fetches active sports
  getSports: () => {
    return axios.get(`/api/sports`);
  },

  // fetches games
  getGames: (sport) => {
    return axios.get('/api/games', {
      sport
    })
  },

  // submits a bet
  // submitBetSlip: async (betInfo) => {
  //   // const mongoose = require('mongoose')
  //   console.log(betInfo)
  //   await Object.keys(betInfo.slips.keys).map((key) => {
  //     betInfo.slips.keys[`${ key }`]['id'] = mongoose.Types.ObjectId()
  //     return betInfo;
  //   })
  //   return axios.post('/api/bet', {
  //     betInfo,
  //   });
  // },

  submitBetSlip: async (betInfo) => {
    // const mongoose = require('mongoose')
    // console.log(betInfo)
    let sum = 0;
    await betInfo.map(async (bet) => {
      await Object.keys(bet.slips.keys).map((key) => {
        bet.slips.keys[`${ key }`]['id'] = mongoose.Types.ObjectId()
        return bet;
      })
      sum += parseFloat(bet.payout.toLose)
      return betInfo;
    })
    console.log('hi')
    return axios.post('/api/bet', {
      betInfo,
      sum
    });
  },


  // gets bets per user
  // getBets: (userId) => {
  //   console.log(userId)
  //   // const body = {id: userId}
  //   return axios.get('/api/bet', {
  //     params: {
  //       id: userId
  //     }
  //   })
  // },

  getBets: async (userId) => {
    // console.log(userId)
    // return axios.get('/api/bet', userId);
    return await axios({
      method: 'GET',
      url: '/api/bet',
      params: {
        userId
      }
    })
  },

  // getUserInfo: async ()


  // post for a new user
  signup: (userData) => {
    return axios.post('/signup', userData);
  },

  // post for logging in
  login: (user) => {
    // console.log(user)
    const username=user.email;
    const password=user.password
    return axios.post('/login', {
      username,
      password
    })
      // .then((response) => {
      //   if (response.data.token) {
      //     console.log(response)
      //     localStorage.setItem('user', JSON.stringify(response.data.user)); // define what is passed back
      //   }
      //   return response;
      // })
      .then((response) => {
        if (response.data.token) {
          // console.log(response)
          localStorage.setItem('user', JSON.stringify(response.data.user)); // define what is passed back
        }
        return response;
      })
      .catch(err => {
        console.log(err);
      });
  },

  // checks if user is logged in
  isLoggedIn: () => {
    if (localStorage.getItem('user') === null) {
      return false;
    }
    return true;
  },

  // function to get the data of the current user
  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),

  getUser: async (user_id) => {
    // console.log(userId)
    // return axios.get('/api/bet', userId);
    return await axios({
      method: 'GET',
      url: '/api/user',
      params: {
        user_id
      }
    })
  },

  // logs user out
  logout: () => {
    localStorage.removeItem('user');
  }
};
