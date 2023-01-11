const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    gameUID: { type: String },
    status: { type: String, default: 'Upcoming' },
    sport: { type: String },
    league: { type: String },
    awayTeam: { type: String },
    homeTeam: { type: String },
    startDate: { type: Date },
    game: {
      odds: {
        // type: Object
      },
      props: {
        player: {

        },
        players: {
          // type: Object
        },
        // type: Object
      },
      keys: {
        gameTie: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameMoneylineAway: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameSpreadAway: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameTotalOver: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameMoneylineHome: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameSpreadHome: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        gameTotalUnder: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfMoneylineAway: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfSpreadAway: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfTotalOver: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfMoneylineHome: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfSpreadHome: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
        halfTotalUnder: {
          id: { type: String },
          initialVal: { type: String },
          prevVal: { type: String },
          currVal: { type: String },
          totalDelta: { type: String },
          currDelta: { type: String },
          deltaOperator: { type: String },
          initialPrice: { type: String },
          prevPrice: { type: String },
          currPrice: { type: String },
          total_price_delta: { type: String },
          current_price_delta: { type: String },
          delta_price_operator: { type: String },
          price_shift: { type: Boolean },
          date_price_shift: { type: Date },
          lineShift: { type: Boolean },
          dateLineShift: { type: Date },
          dateReset: { type: Number }
        },
      },
      results: {
        full: { type: Object },
        final: { type: Object },
      },
    },
    dateChanged: { type: Date },
    date: { type: Date, default: Date.now }
  }
);

gamesSchema.post('findOneAndUpdate', async (game) => {
  console.log(game)
  if (game !== null) {
    const promise = await Object.keys(game.game.keys).map(async (type, i) => {
      const currDate = parseFloat(Date.now())
      switch (true) {
        case (parseFloat(game.game.keys[`${ type }`].currVal) > parseFloat(game.game.keys[`${ type }`].prevVal)):
          game.game.keys[`${ type }`].currDelta = (parseFloat(game.game.keys[`${ type }`].currVal) - parseFloat(game.game.keys[`${ type }`].prevVal)).toString()
          game.game.keys[`${ type }`].totalDelta = (parseFloat(game.game.keys[`${ type }`].currVal) - parseFloat(game.game.keys[`${ type }`].initialVal)).toString()
          game.game.keys[`${ type }`].lineShift = true
          game.game.keys[`${ type }`].dateLineShift = Date.now()
          game.game.keys[`${ type }`].dateReset = currDate + 900000
          game.game.keys[`${ type }`].deltaOperator = 'positive'
          break;

        case (parseFloat(game.game.keys[`${ type }`].currVal) < parseFloat(game.game.keys[`${ type }`].prevVal)):
          game.game.keys[`${ type }`].currDelta = (parseFloat(game.game.keys[`${ type }`].currVal) - parseFloat(game.game.keys[`${ type }`].prevVal)).toString()
          game.game.keys[`${ type }`].totalDelta = (parseFloat(game.game.keys[`${ type }`].currVal) - parseFloat(game.game.keys[`${ type }`].initialVal)).toString()
          game.game.keys[`${ type }`].lineShift = true
          game.game.keys[`${ type }`].dateLineShift = Date.now()
          game.game.keys[`${ type }`].dateReset = currDate + 900000
          game.game.keys[`${ type }`].deltaOperator = 'negative'
          break;

        case ((game.game.keys[`${ type }`].lineShift === true) && (game.game.keys[`${ type }`].dateReset < currDate)):
          game.game.keys[`${ type }`].lineShift = false
          game.game.keys[`${ type }`].dateReset = null
          game.game.keys[`${ type }`].currDelta = '0'
          game.game.keys[`${ type }`].deltaOperator = 'none'
          break;

        default:
          break;
      }
    })
    game.save()
  }
})

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
