const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  username: {
    type: String,
    trim: true
  },
  first_name: {
    type: String,
    trim: true,
    allowNull: false
  },
  last_name: {
    type: String,
    trim: true,
    allowNull: false
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    allowNull: false,
    // validate: {
    //   isEmail: true
    // }
  },
  address: {
    type: String,
    trim: true,
    allowNull: false
  },
  city: {
    type: String,
    trim: true,
    allowNull: false
  },
  state: {
    type: String,
    trim: true,
    allowNull: false
  },
  zipcode: {
    type: Number,
    trim: true,
    allowNull: false
  },
  bets: {
    type: Array,
    ref: 'BetSlip'
  },
  // account_value: {
  //   type: Number,
  //   default: 1000
  // },
  account_value: {
    current: {
      type: Number,
      default: 1000
    },
    pending: {
      type: Number,
      default: 0
    },
    // type: Object,
  },
  // account_value_history: {
  //   type: Array,
  //   default: [{date: Date.now(), value: 1000}]
  // },
  account_value_history: {
    // type: Object,
    balance: {
      type: Array,
      default: [{date: Date.now(), value: 1000}]
    },
    pending: {
      type: Array,
      default: [{date: Date.now(), value: 0}]
    }
  },

  account_pending_history: {
    type: Array,
    default: [{date: Date.now(), value: 0}]
  },
  betting_outcome_history: {
    type: Array
  }
});

userSchema.plugin(passportLocalMongoose);

userSchema.post('findOneAndUpdate', (user) => {
  // console.log(user)
  user.account_value.current += parseFloat(user.betting_outcome_history[user.betting_outcome_history.length-1].outcome);
  user.account_value.pending -= Math.abs(parseFloat(user.betting_outcome_history[user.betting_outcome_history.length-1].outcome));
  // console.log(user.account_value.pending)
  // user.account_value_history.push({date: Date.now(), value: user.account_value.current})
  // user.account_pending_history.push({date: Date.now(), value: user.account_value.pending})
  user.account_value_history.balance.push({date: Date.now(), value: user.account_value.current})
  user.account_value_history.pending.push({date: Date.now(), value: user.account_value.pending})

  user.save();
  console.log(user.account_value.pending)
})

const User = mongoose.model('User', userSchema);

module.exports = User;
