const mongoose = require("mongoose");

const WaiterSchema = new mongoose.Schema({
  name: String,
  hours: Number,
  date: String,
  seventyPercent: Boolean
});

const WaiterModel = mongoose.model("waiters", WaiterSchema);
module.exports = WaiterModel;
