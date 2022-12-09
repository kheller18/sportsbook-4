const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const routes = require('./routes/api.js');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const Scores = require('./client/src/utils/Scores')
const Games = require('./models/games');
const Sports = require('./models/sport');
const cron = require('node-cron');

const PORT = process.env.PORT || 3001;
const app = express();
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  console.log('product')
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./services/gameSeed');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook4", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
  .then(() => {
    console.log("connected")
    app.use(routes)

    // Define any API routes before this runs
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });

    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
      cors: {
        methods: ['GET', 'POST'],
        allowedHeaders: ['x-access-token'],
        credentials: true
      }
    })

    const fetchData = async (socket) => {
      let sportsPackage = '';
      let leagues = {}
      let gamesPackage = {leagues}

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

      const fetchActiveGames = async () => {
        leagues = {}
        gamesPackage = {leagues}
        const promises = sportsPackage.map(async (sport, index) => {
          const promises2 = await Object.keys(sport.leagues).map(async league => {
            const promise = await Games.find({"league": league}).then((games, i) => {
              if (games.length > 0) {
                sportsPackage[index].leagues[`${ league }`].games.active = true
                gamesPackage.leagues[`${ league }`] = games;
              } else {
                sportsPackage[index].leagues[`${ league }`].games.active = false
              }
            })
          })
          await Promise.all(promises2)
        })
        await Promise.all(promises)
      }

      await fetchActiveSports();
      await fetchActiveGames();
      socket.emit('package', {navData: sportsPackage, gameData: gamesPackage})
      console.log('initial seed')

      const scheduleTask = cron.schedule('* * * * *', async () => {
        await fetchActiveSports();
        await fetchActiveGames();
        socket.emit('package', {navData: sportsPackage, gameData: gamesPackage})
        console.log(new Date())
      })
    };

    let loggedOnUsers = [];
    let data = '';
    io.on('connection', (socket) => {
      if (socket.handshake.headers['x-current-user']) {
        loggedOnUsers[socket.handshake.headers['x-current-user']] = socket.id;
        fetchData(socket)
      }

      console.log('connection granted' , {
        socket: socket.id,
        userId: socket.handshake.headers['x-current-user']
      })

      console.log({users: loggedOnUsers})

      // fetchData(socket);
      // setInterval(() =>  fetchData(socket), 20000)
      // fetchData(socket)

      socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        loggedOnUsers[socket.handshake.headers['x-current-user']] = null;
        console.log({users: loggedOnUsers})
        // socket.removeAllListeners()
      })

      // Games.find().then(res => {
      //   // console.log(res)
      //   data = res;
      // })

      // // socket.emit('data', data)
      // io.emit('data', data)
      // socket.on('package', (data) => {
      //   // socket.emit('data', (data))
      //   io.emit('data', (data))
      // })

      // socket.emit('hello can u hear me')
    })

    server.listen(PORT, () => {
      console.log(`🌎 ==> API Socket server now on port ${PORT}!`);
      // require('./services/gameSeed');

    });
  });
