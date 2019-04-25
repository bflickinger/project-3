const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  computer: {
    type: Number,
    default: 0
  },
  player: {
    type: Number,
    default: 0
  },
  memory: [ { board: String , moves: [ { f: Number, t: Number} ] }]
});

module.exports = User = mongoose.model("users", UserSchema);
