const mongoose = require('mongoose');
const db = require('../models/betSlip');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// const betSeed = {
//   "gameUID" : [ 
//     "2462438"
//   ],
//   "betUID" : [ 
//     "2462438-1",
//     "2462438-4"
//   ],
//   "type": "Parlay",
//   "status": "Active",
//   "outcome": false,
//   "slips" : [
//     {
//       "key" : "2462438-1",
//       "betInfo" : {
//         "gameKey" : "2462438",
//         "betKey" : "2462438-1",
//         "betType" : "MONEYLINE",
//         "team" : "Montreal Canadiens",
//         "line" : null,
//         "odds" : "-105",
//         "toLose" : "10",
//         "toWin" : "9.50",
//         "status" : "LIVE",
//         "outcome" : null,
//         "payout" : null
//       },
//     },
//     {
//       "key" : "2462438-4",
//       "betInfo" : {
//         "gameKey" : "2462438",
//         "betKey" : "2462438-4",
//         "betType" : "MONEYLINE",
//         "team" : "Winnepeg",
//         "line" : null,
//         "odds" : "-105",
//         "toLose" : "10",
//         "toWin" : "9.50",
//         "status" : "LIVE",
//         "outcome" : null,
//         "payout" : null
//       }
//     }
//   ]
// }

const betSeed = {
  "gameUID" : [ 
    "2462438"
  ],
  "betUID" : [ 
    "2462438-1",
    "2462438-4"
  ],
  "type": "Parlay",
  "quantity": {
    "completed": 0,
    "total": 1
  },
  "status": "Active",
  "outcome": true,
  "payout": {
    "totalOdds": "-105",
    "toLose": "50",
    "toWin": "120",
    "final": ""
  },
  "slips" : {
    "keys": {
      "2462438-1": {
        "_id" : mongoose.Types.ObjectId(),
        "gameKey" : "2462438",
        "betKey" : "2462438-1",
        "betType" : "Moneyline",
        "team" : "Montreal Canadiens",
        "line" : null,
        "odds" : "-105",
        "status" : "Active",
        "outcome" : true,
      }, 
      "2462438-4": {
        "_id" : mongoose.Types.ObjectId(),
        "gameKey" : "2462438",
        "betKey" : "2462438-4",
        "betType" : "Moneyline",
        "team" : "Winnepeg",
        "line" : null,
        "odds" : "-105",
        "status" : "Active",
        "outcome" : true,
      }
    }
    // {
    //   "key" : "2462438-1",
    //   "betInfo" : {
    //     "gameKey" : "2462438",
    //     "betKey" : "2462438-1",
    //     "betType" : "MONEYLINE",
    //     "team" : "Montreal Canadiens",
    //     "line" : null,
    //     "odds" : "-105",
    //     "toLose" : "10",
    //     "toWin" : "9.50",
    //     "status" : "LIVE",
    //     "outcome" : null,
    //     "payout" : null
    //   },
    // },
    // {
    //   "key" : "2462438-4",
    //   "betInfo" : {
    //     "gameKey" : "2462438",
    //     "betKey" : "2462438-4",
    //     "betType" : "MONEYLINE",
    //     "team" : "Winnepeg",
    //     "line" : null,
    //     "odds" : "-105",
    //     "toLose" : "10",
    //     "toWin" : "9.50",
    //     "status" : "LIVE",
    //     "outcome" : null,
    //     "payout" : null
    //   }
    // }
  }
}


  db.create(betSeed)
  .then(data => {
    console.log(data);
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

