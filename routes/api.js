const router = require('express').Router();
const passport = require('passport')
const BetSlip = require('../models/betSlip');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Game = require('../models/games')
const Sport = require('../models/sport')
const mongoose = require('mongoose');

// router.post('/api/bet', (req, res) => {
//   BetSlip.create(req.body.betInfo)
//     .then(dbBetSlip => {
//       res.json(dbBetSlip);
//     })
//     .catch(err => {
//       res.status(404).json(err);
//     });
// });
// router.post('/api/bet', async (req, res) => {
//   let user;
//   await BetSlip.create(req.body.betInfo).then(async dbBetSlip => {
//     console.log(dbBetSlip)
//     await User.find(
//       {'user_id': dbBetSlip.userID}, async (err, doc) => {
//         await User.updateOne(
//           {'user_id': dbBetSlip.userID},
//           {
//             $set: {
//               'account_value.pending': doc[0].account_value.pending + parseFloat(dbBetSlip.payout.toLose),
//               'account_value.current': doc[0].account_value.current - parseFloat(dbBetSlip.payout.toLose)
//             }
//           },
//           { new: true }, (err, doc) => {
//             user = doc;
//             console.log(user)
//           }
//         )
//       }
//       // }
//     )
//     // res.json(dbBetSlip);
//     res.json({slip: dbBetSlip, user: user});
//   }).catch(err => {
//     res.status(404).json(err);
//   });
//       // res.json(dbBetSlip);
// });

//best one yet
// router.post('/api/bet', async (req, res) => {
//   // let user1 = {};
//   let user = {};
//   console.log(req.body.betInfo)
//   await BetSlip.create(req.body.betInfo).then(async dbBetSlip => {
//     // console.log(dbBetSlip)
//     console.log('hello')
//     let h = await User.find(
//       {
//         'user_id': dbBetSlip.userID
//       }, async (err, doc) => {
//         console.log('1')
//         await User.findOneAndUpdate(
//         // let user1 = await User.findOneAndUpdate(
//           {'user_id': dbBetSlip.userID},
//           {
//             $set: {
//               'account_value.pending': doc[0].account_value.pending + parseFloat(dbBetSlip.payout.toLose),
//               'account_value.current': doc[0].account_value.current - parseFloat(dbBetSlip.payout.toLose)
//             }
//           },
//           { new: true }, async (err, doc) => {
//             // user1 = doc;
//             console.log('2')
//             // console.log(doc)
//             if (!err) {
//               await res.json({slip: dbBetSlip, user: doc});
//             }
//             // user = doc;
//             // console.log(user)
//           }
//         )
//         // user = user1;
//         // console.log('1')
//         // await new Promise(user1)
//         // return user;
//         // console.log(user)
//         // doc.save()
//       }
//       // }
//     )
//     // await Promise.all(h)
//     console.log('2')
//     // console.log(user)
//     // res.json(dbBetSlip);
//     // console.log(user)
//     // res.json({slip: dbBetSlip});
//     // res.json({slip: dbBetSlip, user: user[0]});

//   }).catch(err => {
//     res.status(404).json(err);
//   });
//       // res.json(dbBetSlip);
// });

// this is the one
// router.post('/api/bet', async (req, res) => {
//   // console.log(req.body.betInfo)
//   console.log(req.body.sum)
//   console.log('after after')
//   if (req.body.betInfo.length > 1) {
//     let slips = {}
//     BetSlip.insertMany(req.body.betInfo).then((data) => {
//       console.log(data)
//       slips = data;
//       User.findOne({'user_id': data[0].userID}).then((data2) => {
//         console.log(data2)
//         User.findOneAndUpdate(
//           {'user_id': data2.user_id},
//           {
//             $set: {
//               'account_value.pending': data2.account_value.pending + parseFloat(req.body.sum),
//               'account_value.current': data2.account_value.current - parseFloat(req.body.sum)
//             }
//           },
//           { new: true }, (err, user) => {
//             return res.json({slip: slips, user: user});
//           }
//         )
//       })
//     })
//   } else {
//     let slips = {}
//     BetSlip.create(req.body.betInfo).then((slip) => {
//       console.log(slip)
//       slips = slip;
//       User.findOne({'user_id': slip[0].userID}).then((initial_user) => {
//         console.log(initial_user)
//         User.findOneAndUpdate(
//           {'user_id': initial_user.user_id},
//           {
//             $set: {
//               'account_value.pending': initial_user.account_value.pending + parseFloat(req.body.sum),
//               'account_value.current': initial_user.account_value.current - parseFloat(req.body.sum)
//             }
//           },
//           { new: true }, (err, user) => {
//             return res.json({slip: slips, user: user});
//           }
//         )
//       })
//     })
//   }
// });

router.post('/api/bet', async (req, res) => {
  // console.log(req.body.betInfo)
  console.log(req.body.sum)
  console.log('after after')
  if (req.body.betInfo.length > 1) {
    let slips = {}
    BetSlip.insertMany(req.body.betInfo).then((slip) => {
      console.log(slip)
      slips = slip;
      User.findOne({'user_id': slip[0].userID}).then((initial_user) => {
        console.log(initial_user)
        User.updateOne(
          {'user_id': initial_user.user_id},
          {
            $set: {
              'account_value.pending': initial_user.account_value.pending + parseFloat(req.body.sum),
              'account_value.current': initial_user.account_value.current - parseFloat(req.body.sum)
            }
          },
          { new: true }
        ).then((hi) => {
          User.findOne({'user_id': initial_user.user_id}).then((finalUser) => {
            return res.json({slip: slips, user: finalUser});
          })
        })
      })
    })
  } else {
    let slips = {}
    BetSlip.create(req.body.betInfo).then((slip) => {
      console.log(slip)
      slips = slip;
      User.findOne({'user_id': slip[0].userID}).then((initial_user) => {
        console.log(initial_user)
        User.updateOne(
          {'user_id': initial_user.user_id},
          {
            $set: {
              'account_value.pending': initial_user.account_value.pending + parseFloat(req.body.sum),
              'account_value.current': initial_user.account_value.current - parseFloat(req.body.sum)
            }
          },
          { new: true }
        ).then((hi) => {
          User.findOne({'user_id': initial_user.user_id}).then((finalUser) => {
            return res.json({slip: slips, user: finalUser});
          })
        })
      })
    })
  }
});

// router.post('/api/bet', async (req, res) => {
//   await BetSlip.create(req.body.betInfo).then(async dbBetSlip => {
//     console.log(dbBetSlip)
//     let user;
//     await User.findOneAndUpdate(
//       {'user_id': dbBetSlip.userID},
//       {
//         // $set: {
//         //   'account_value.pending': parseFloat(dbBetSlip.payout.toLose)
//         // }
//         $set: {
//           // 'account_value.pending': 100 + parseFloat(dbBetSlip.payout.toLose)
//           'account_value.pending': { $add: ["$account_value.pending", parseFloat(dbBetSlip.payout.toLose)] }
//         }

//         // $sum: {'account_value.pending': { $add: ["$account_value.pending", parseFloat(dbBetSlip.payout.toLose)] }}
//       },
//       { new: true }
//     ), (err, doc) => {user = doc
//     return user;
//     }
//     res.json(dbBetSlip);
//   })
//   .catch(err => {
//     res.status(404).json(err);
//   });
// });

// router.post('/api/bet/bulk', (req, res) => {
//   // console.log(req.body)
//   BetSlip.insertMany(req.body)
//     .then(dbSlip => {
//       res.json(dbSlip);
//     })
//     .catch(err => {
//       res.status(404).json(err);
//     });
// });

router.post('/api/bet/bulk', (req, res) => {
  // console.log(req.body)
  BetSlip.insertMany(req.body)
    .then(async dbSlip => {
      res.json(dbSlip);
      await User.find(
        {
          'user_id': dbBetSlip.userID
        }, async (err, doc) => {
          // console.log('1')
          await User.findOneAndUpdate(
          // let user1 = await User.findOneAndUpdate(
            {'user_id': dbBetSlip.userID},
            {
              $set: {
                'account_value.pending': doc[0].account_value.pending + parseFloat(dbBetSlip.payout.toLose),
                'account_value.current': doc[0].account_value.current - parseFloat(dbBetSlip.payout.toLose)
              }
            },
            { new: true }, async (err, doc) => {
              // user1 = doc;
              console.log('2')
              console.log(doc)
              if (!err) {
                await res.json({slip: dbBetSlip, user: doc});
              }
              // user = doc;
              // console.log(user)
            }
          )
          // user = user1;
          // console.log('1')
          // await new Promise(user1)
          // return user;
          // console.log(user)
          // doc.save()
        }
        // }
      )

    })
    .catch(err => {
      res.status(404).json(err);
    });
});


// router.get('/api/bet', (req, res) => {
//   BetSlip.find({})
//     .then(dbBetSlip => {
//       console.log(dbBetSlip);
//       res.json(dbBetSlip);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

router.get('/api/user', (req, res) => {
  User.findOne(
    { 'user_id': req.query.user_id }
  ).then((user) => {
    res.json(user)
  }).catch((err) => {
    res.status(400).json(err);
  })
})

router.get('/api/bet', (req, res) => {
  // console.log('req.body')
  // console.log(req.query.userId)
  BetSlip.find({
    'userID': req.query.userId
  }).then(dbBetSlip => {
      // console.log(dbBetSlip);
      res.json(dbBetSlip);
    }).catch(err => {
      res.status(400).json(err);
    });
});

router.post('/signup', (req, res) => {
  console.log(req.body)
  const Users = new User({
    username: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode
  });

  User.register(Users, req.body.password, function(err, user) {
    if (err) {
      res.json({success: false, message:"creation unsuccessful", err});
    } else {
      // passport.authenticate('local')(req, res, function() {
      //   console.log('authenticated');
      // })
      // console.log(user)
      res.json({success: true, message:'creation successful', user});
    }
  });
});

router.post('/login', (req, res) => {
  // console.log("inside /login");
  passport.authenticate('local', async (err, user, info) => {
  //  console.log(req.body)
    if (err) {
      res.json({success: false, message: err})
    } else if (!user) {
      res.json({success: false, message: 'username or pass incorrect'})
    } else {
      const token = jwt.sign({username: user.username}, 'shhhh', {expiresIn: '1h'});
      await BetSlip.find({
        'userID': user.user_id
      }).then(dbBetSlip => {
          // console.log(dbBetSlip);
          user['slips'] = dbBetSlip;
          console.log(user.slips)
          // `user.slips` = dbBetSlip;
          // console.log('inside user');
          // console.log(user);
          res.json({success: true, message: "authentication successful", token, user, dbBetSlip});
          // res.json(dbBetSlip);
        })
        .catch(err => {
          res.status(400).json(err);
        });
      // res.json({success: true, message: "authentication successful", token, user});
    }
  }) (req, res);
});

module.exports = router;
