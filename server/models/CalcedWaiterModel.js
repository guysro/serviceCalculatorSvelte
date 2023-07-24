const mongoose = require("mongoose");

const CalcedWaiterSchema = new mongoose.Schema({
  name: String,
  hours: Number,
  date: String,
  seventyPercent: Boolean,
  cash: Number,
  cred: Number
});

const CalcedWaiterModel = mongoose.model("calcedWaiters", CalcedWaiterSchema);
module.exports = CalcedWaiterModel;
