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
  // await User.aggregate([
  //   {
  //     $lookup: {
  //       from: 'betslips',
  //       localField: '_id',
  //       foreignField: 'userID',
  //       as: 'bets'
  //     }
  //   }, async (err, docs) => {
  //     console.log(err)
  //     console.log(docs)
  //   }
  // ])
  User.aggregate([
    {
      $lookup:
        {
          from: 'betslips',
          pipeline: [
            { $match:
                { $eq: ["$userID", "$user_id"] }
            }
          ],
          // localField: '_id',
          // foreignField: 'userID',
          as: 'bets'
        }
    }, (err, docs) => {
      console.log(err)
      console.log(docs)
    }
  ])

  // const aggregateSlips = await Slip.find(
  //   {
  //     "userID": { $in: [ results.results.moneylineHome.id ] },
  //   }, async (err, docs) => {
  //     const betUID = results.results.moneylineHome.id;
  //     const updateDocs = await docs.map(async (doc) => {
  //       if (results.results.moneylineHome.value === true) {
  //         await Slip.findOneAndUpdate(
  //           {
  //             "_id": doc._id,
  //           },
  //           {
  //             $set: {
  //               [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": true},
  //               [`slips.keys.${ betUID }.status`]: "Completed",
  //             },
  //             $inc: {
  //               "quantity.completed": 1
  //             }
  //           },
  //           {
  //             new: true
  //           }
  //         )
  //       } else {
  //         await Slip.findOneAndUpdate(
  //           {
  //             "_id": doc._id,
  //           },
  //           {
  //             $set: {
  //               "outcome": false,
  //               [`slips.keys.${ betUID }.outcome`]: {"value": "" , "logic": false},
  //               [`slips.keys.${ betUID }.status`]: "Completed",
  //             },
  //             $inc: {
  //               "quantity.completed": 1
  //             }
  //           },
  //           {
  //             new: true
  //           }
  //         )
  //       }
  //     })
  //     await Promise.all(updateDocs)
  //   }
  // )

});
