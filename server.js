const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const routes = require('./routes/api.js');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const Games = require('./models/games');
const Sports = require('./models/sport');
const cron = require('node-cron');
const moment = require('moment');

// defining the port for heroku or local
const PORT = process.env.PORT || 3001;

// initializing app
const app = express();

// settting up express details
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

// serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // require('./seeders/herokuSeed')(db);
  // require('./seeders/sportSeed');
  console.log('product');
} else {
  require('dotenv').config();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./services/gameService2');
require('./services/resultService2');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  // setting up routes
  app.use(routes);

  // define any API routes before this runs
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  // initializing server
  const server = require('http').createServer(app);

  // setting up socket
  const io = require('socket.io')(server, {
    cors: {
      methods: ['GET', 'POST'],
      allowedHeaders: ['x-access-token', 'Origin', 'Content-Type', 'application/json'],
      credentials: true
    }
  })

  const fetchData = async (socket, user_id) => {
    let sportsPackage = '';
    let leagues = {};
    let sendUser = {}
    let gamesPackage = {leagues};
    // console.log(socket.handshake.headers['x-current-user'])

    // finds active sports in season and their attributes for nav bar
    const fetchActiveSports = async () => {
      sportsPackage = '';
      const promise = await Sports.find({active: true}).then(async sports => {
        let sportsObj = await sports.map((sport) => ({
          name: sport.sportTitle,
          leagues: sport.leagues
        }))
        sportsPackage = sportsObj;
      })
    }

    // finds games based on active sports
    const fetchActiveGames = async () => {
      leagues = {};
      gamesPackage = {leagues};
      const promises = sportsPackage.map(async (sport, index) => {
        const promises2 = await Object.keys(sport.leagues).map(async league => {
          // console.log(league)
          const promise = await Games.find({"league": league, "startDate": { $gte: moment()}, "game.keys.gameTotalOver.currVal": { $ne: null }, "game.keys.gameTotalUnder.currVal": { $ne: null } }).then((games, i) => {
            if (games.length > 0) {
              // rearranges games array by ascending start date
              games.sort((a, b) => a.startDate - b.startDate)
              sportsPackage[index].leagues[`${ league }`].games.active = true;
              gamesPackage.leagues[`${ league }`] = games;
            } else {
              sportsPackage[index].leagues[`${ league }`].games.active = false;
            }
          })
        })
        await Promise.all(promises2);
      })
      await Promise.all(promises);
    }

    const fetchUser = async (user_id) => {
      console.log(user_id)
      sendUser = {};
      const promise = await User.findOne({ 'user_id': user_id }).then((user) => {
        sendUser = user;
        // return user;
      })
      // await Promise.all(promise)
        // .catch((err) => {
        //   console.log(err);
        // })
        // return sendUser;
    }


    await fetchActiveSports();
    await fetchActiveGames();
    // console.log(socket.handshake.headers['x-current-user'])
    const returnData = {navData: sportsPackage, gameData: gamesPackage}

    // function to emit site data to users every minute using sockets
    const scheduleTask = cron.schedule('* * * * *', async () => {
      console.log('hello')
      await fetchActiveSports();
      await fetchActiveGames();
      await fetchUser(user_id)
      // console.log('package after');
      // console.log(socket.handshake.headers['x-current-user'])
      socket.emit('package', {navData: sportsPackage, gameData: gamesPackage, userData: sendUser});
    });

    return returnData;
  };

  // const fetchUser = async (user_id, socket) => {
  //   console.log(user_id)
  //   let sendUser = {}
  //   const fetchActiveUser = async () => {
  //     const promise = await User.findOne({ 'user_id': user_id }).then((user) => {
  //       sendUser = user;
  //     })
  //     return user;
  //     // .catch((err) => {
  //     //   console.log(err);
  //     // })
  //     // return sendUser;
  //   }
  //   // await fetchActiveUser();

  //   const scheduleTask = cron.schedule('*/1.5 * * * *', async () => {
  //     await fetchActiveUser();
  //     console.log(sendUser)
  //     // console.log('package after');
  //     // console.log(socket.handshake.headers['x-current-user'])
  //     socket.emit('user', sendUser);
  //     // socket.emit('user', user);
  //   });

  //   // return sendUser;
  // }

  let loggedOnUsers = [];
  let sendData;

  // when a user connects, this should give them the data they need for the betting component
  io.on('connection', async (socket) => {
    if (socket.handshake.headers['x-current-user']) {
      loggedOnUsers[socket.handshake.headers['x-current-user']] = socket.id;
      // logsocket.handshake.headers['x-current-user']] = socket.id;
      // sendData = await fetchData(socket);
    }

    // socket.on('connect', () => {
    //   console.log('hello')
    // })

    console.log('connection granted' , {
      socket: socket.id,
      userId: socket.handshake.headers['x-current-user']
    });

    // socket.on('package', (data) => {
    //   // console.log(data)
    //   socket.emit('package', sendData)
    // })
    // socket.on('user', (data) => {
    //   console.log('inside user')
    //   fetchUser(data.user_id, socket)
    // })

    socket.on('package', async (data) => {
      // console.log(data)
      // const user = await fetchUser(data.user_id, socket)
      // fetchUser(data.user_id, socket)
      // sendData['user'] = user;
      // console.log(socket)
      sendData = await fetchData(socket, data.user_id);
      socket.emit('package', sendData)
    })

    socket.on('disconnect', () => {
      // console.log('user disconnected', socket.id)
      loggedOnUsers[socket.handshake.headers['x-current-user']] = null;
      // socket.removeAllListeners()
    });
  });

  server.listen(PORT, () => {
    console.log(`🌎 ==> API Socket server now on port ${PORT}!`);
  });
});
