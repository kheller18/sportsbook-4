const mongoose = require('mongoose');
const Sport = require('../models/sport');
const axios = require('axios');
const cron = require('node-cron');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(async () => {

  const getSports = async() => {
    const leagueRelations = {
      'MLB': 'Baseball',
      'NCAA Basketball': 'Basketball',
      'NBA': 'Basketball',
      'NCAA Football': 'Football',
      'NHL': 'Hockey',
      'NFL': 'Football',
      'PGA': 'Golf',
      'LPGA': 'Golf',
      'Fed-Ex 500 Events': 'Golf',
      'Champions Tour': 'Golf',
      'UFC': 'Martial Arts',
      'ATP': 'Tennis',
      'WTA': 'Tennis',
      'England - Premier League': 'Soccer',
      'EPL': 'Soccer',
      'Germany - Bundesliga': 'Soccer',
      'Bundesliga': 'Soccer',
      'La Liga': 'Soccer',
      'Liga': 'Soccer',
      'France': 'Soccer',
      'Ligue 1': 'Soccer',
    }

  }
});
