const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  waiters: Array,
  date: String,
  cash: Number,
  credit: Number
});

const DayModel = mongoose.model("daily", DaySchema);
module.exports = DayModel;
