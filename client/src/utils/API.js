/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const mongoose = require('mongoose')

export default {
  //call to get active sports to call for "getLines"
  // getSports: () => {
  //   return axios.get(`https://api.the-odds-api.com/v3/sports?apiKey=${ process.env.REACT_APP_API_KEY }`);
  // },

  getSports: () => {
    return axios.get(`/api/sports`);
  },

  getGames: (sport) => {
    return axios.get('/api/games', {
      sport
    })
  },

  // call to get different api lines depending on sports and linetype
  getLines: (sport, lineType) => {
    switch(lineType) {
      case 'moneyline':
        return axios.get(`https://api.the-odds-api.com/v3/odds?&apiKey=${ process.env.REACT_APP_API_KEY }&sport=${ sport }&region=us&mkt=h2h&oddsFormat=american`);
      case 'spread':
        return axios.get(`https://api.the-odds-api.com/v3/odds?&apiKey=${ process.env.REACT_APP_API_KEY }&sport=${ sport }&region=us&mkt=spreads&oddsFormat=american`);
      case 'totals':
        return axios.get(`https://api.the-odds-api.com/v3/odds?&apiKey=${ process.env.REACT_APP_API_KEY }&sport=${ sport }&region=us&mkt=totals&oddsFormat=american`);
      default:
        return axios.get(`https://api.the-odds-api.com/v3/odds?&apiKey=${ process.env.REACT_APP_API_KEY }&sport=${ sport }&region=us&mkt=h2h&oddsFormat=american`);
      }
  },

  // submits a bet
  submitBetSlip: async (betInfo) => {
    // console.log('hello submit')
    // const mongoose = require('mongoose')
    console.log(betInfo.slips.keys)
    await Object.keys(betInfo.slips.keys).map((key) => {
      console.log(key)
      betInfo.slips.keys[`${ key }`]['id'] = mongoose.Types.ObjectId()
      // console.log(betInfo.slips.keys.key.id)
    })
    return axios.post('/api/bet', {
      betInfo,
    });
  },

  // gets bets per user
  getBets: (userId) => {
    return axios.get('/api/bet', {
      userId
    });
  },

  // getUserBets: (userId) => {
  //   return axios.get('/api/bet', {
  //     userId
  //   });
  // },

  // post for a new user
  signup: (userData) => {
    return axios.post('/signup', userData);
  },

  // posts for logging in
  login: (username, password) => {
    return axios.post('/login', {
      username,
      password
    })
      .then((response) => {
        if (response.data.token) {
          console.log(response)
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

  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),

  // logs user out
  logout: () => {
    localStorage.removeItem('user');
  }
};
