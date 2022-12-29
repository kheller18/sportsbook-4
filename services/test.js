const mongoose = require('mongoose');
const Game = require('../models/games');
const Slip = require('../models/betSlip');
const User = require('../models/user');
const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {

  // const doc = User.findOne({"user_id": '63acf4d531893cd5490294cb'}).populate('userID')
  const doc = Slip.findOne({"userID": '63acf4d531893cd5490294cb'}).populate({path: 'bets', select:['firstName']})
  // console.log(doc.schema.obj.bets.type)
  console.log(doc)

});
