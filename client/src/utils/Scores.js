// import React from 'react';
// import axios from 'axios';
const axios = require('axios');

const Scores = () => {
  setInterval(() => getSports(), 6000)

  const getSports = () => {
    axios.get(`https://betonline-basketball-nba.datafeeds.net/api/json/odds/v2/basketball/nba?api-key=5afca6d81396efe5c27658dfc7800a84`)
      .then(res => {
        console.log(res.data.games)
        const game = res.data.games
        axios.post('/api/games', {
          game
        });
      })
      .catch(err => {
        console.log(err)
      })

    }
}

module.exports = Scores;
 