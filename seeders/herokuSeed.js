module.exports = (db) => {
  const sportSeed = require('./sportSeed');

  db.Sport.insertMany(sportSeed).then(data => {
    console.log(data.length)
  })
}
