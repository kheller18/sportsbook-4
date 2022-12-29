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
    firstName: {
      type: String,
      trim: true,
      allowNull: false
    },
    lastName: {
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
    account_value: {
      type: Number,
      default: 1000
    },
    account_value_history: {
      type: Array
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
