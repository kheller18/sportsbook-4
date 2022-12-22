const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const betSlipSchema = new Schema({
  userID: { type: String },
  gameUID: { type: Array },
  betUID: { type: Array },
  type: { type: String },
  quantity: { type: Object },
  status: { type: String, default: "Active" },
  outcome: { type: Boolean, default: true },
  payout: {
    toWin: { type: String },
    toLose: { type: String },
    final: { type: String },
    totalOdds: { type: Number },
    decOdds: { type: Number },
    oddsArr: { type: Array }
  },
  slips: { type: Object },
  date: { type: Date, default: Date.now }
});

betSlipSchema.post('findOneAndUpdate', (slip) => {
  const completed = slip.quantity.completed;
  const totalBets = slip.quantity.total;
  console.log(`${ completed }/${ totalBets }`)

  if (totalBets === completed) {
    slip.status = "Completed"
    if (slip.outcome === true) {
      slip.payout.final = slip.payout.toWin;
      slip.save();
    } else {
      slip.payout.final = `-${ slip.payout.toLose }`;
      slip.save();
    }
  }
});

const BetSlip = mongoose.model("BetSlip", betSlipSchema);

module.exports = BetSlip;
