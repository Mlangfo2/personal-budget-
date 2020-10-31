const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Budget = new Schema({
  title: {
    type: String,
        trim: true,
        unique: true,
        required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Budget_List", budgetListSchmea);