const router = require('express').Router();
const passport = require('passport')
const BetSlip = require('../models/betSlip');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Game = require('../models/games')
const Sport = require('../models/sport')
const mongoose = require('mongoose');

router.post('/api/bet', (req, res) => {
  BetSlip.create(req.body.betInfo)
    .then(dbBetSlip => {
      res.json(dbBetSlip);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/api/bet/bulk', (req, res) => {
  // console.log(req.body)
  BetSlip.insertMany(req.body)
    .then(dbSlip => {
      res.json(dbSlip);
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

router.get('/api/bet', (req, res) => {
  // console.log('req.body')
  // console.log(req.query.userId)
  BetSlip.find({
    'userID': req.query.userId
  })
    .then(dbBetSlip => {
      // console.log(dbBetSlip);
      res.json(dbBetSlip);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/signup', (req, res) => {
  const Users = new User({
    username: req.body.user.email,
    firstName: req.body.user.first_name,
    lastName: req.body.user.last_name,
    email: req.body.user.email,
    address: req.body.user.address,
    city: req.body.user.city,
    state: req.body.user.state,
    zipcode: req.body.user.zipcode
  });

  User.register(Users, req.body.password, function(err, user) {
    if (err) {
      res.json({success: false, message:"creation unsuccessful", err})
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
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.json({success: false, message: err})
    } else if (!user) {
      res.json({success: false, message: 'username or pass incorrect'})
    } else {
      const token = jwt.sign({username: user.username}, 'shhhh', {expiresIn: '1h'});
      res.json({success: true, message: "authentication successful", token, user});
    }
  }) (req, res);
});

module.exports = router;
