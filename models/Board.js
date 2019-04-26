const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BoardSchema = new Schema({
  board: {
    type: String,
    required: true
  },
  moves: [{ f: Number, t: Number }]
});

module.exports = Board = mongoose.model("boards", BoardSchema);
