const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const WaiterModel = require("./models/WaiterModel.js");
const DayModel = require("./models/DayModel.js");
const CalcedWaiterModel = require("./models/CalcedWaiterModel.js");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://guykube100:Guy123Sroka@cluster0.l3trlre.mongodb.net/waiters?retryWrites=true&w=majority");

async function getAll() {
  const found = await WaiterModel.find();
  return found;
}
async function getDays(month) {
  let returnArr = [];
  const found = await DayModel.find();
  found.forEach((day) => {
    if (day.date.slice(5, 7) === month) {
      returnArr.push(day);
    }
  });
  return returnArr;
}
async function getByDate(date) {
  const found = await WaiterModel.find({ "date": date });
  return found;
}

async function checkDate(date) {
  const dateFound = await DayModel.exists({ "date": date });
  return dateFound != null;
}

async function checkWaiter(name, date) {
  const waitersFound = await CalcedWaiterModel.exists({ "date": date, "name": name });
  return waitersFound != null;
}

async function updateDay(date, waiterList) {
  const dayUpdated = await DayModel.findOneAndUpdate({ "date": date }, { "waiters": waiterList });
  return dayUpdated;
}

async function updateCalcWaiter(name, cash, cred) {
  const waiterUpdated = await CalcedWaiterModel.findOneAndUpdate({ "name": name }, { "cash": cash, "cred": cred });
  return waiterUpdated;
}

async function getAllCalcWaitersByName(name) {
  const waiterAll = await CalcedWaiterModel.find({ "name": name });
  return waiterAll;
}

async function getCurrentDay(date) {
  const day = await DayModel.findOne({ "date": date });
  return day;
}

app.get("/get", (req, res) => {
  getAll().then((waitersFound) => res.json(waitersFound));
});

app.post("/getDays", (req, res) => {
  getDays(req.body.month).then((days) => res.json(days));
});

app.post("/addWaiter", async function (req, res) {
  const waiter = req.body;
  const newWaiter = new WaiterModel(waiter);
  await newWaiter.save();

  res.json(waiter);
});

app.post("/addCalcedWaiter", async function (req, res) {
  const waiter = req.body;
  const newWaiter = new CalcedWaiterModel(waiter);
  await newWaiter.save();

  res.json(waiter);
});

app.post("/getByDate", (req, res) => {
  if (req.body.date) {
    getByDate(req.body.date).then((waitersFound) => res.json(waitersFound));
  }
});

app.post("/checkDate", (req, res) => {
  if (req.body.date) {
    checkDate(req.body.date).then((isFound) => res.json(isFound));
  }
});

app.post("/checkWaiterCalc", (req, res) => {
  checkWaiter(req.body.name, req.body.date).then((isFound) => res.json(isFound));
});

app.post("/updateCalcWaiter", (req, res) => {
  updateCalcWaiter(req.body.name, req.body.cash, req.body.cred).then((waiterUpdated) => res.json(waiterUpdated));
});

app.post("/updateDay", (req, res) => {
  if (req.body.date) {
    updateDay(req.body.date, req.body.waiters).then((resp) => res.json(resp));
  }
});

app.post("/addDay", (req, res) => {
  if (req.body) {
    const day = req.body;
    const addedDay = new DayModel(day);
    addedDay.save();
    res.json(addedDay);
  }
});

app.post("/getCurrentDay", (req, res) => {
  getCurrentDay(req.body.date).then((day) => res.json(day));
});

app.post("/getWaiterMoneyByName", (req, res) => {
  getAllCalcWaitersByName(req.body.name).then((waiter) => res.json(waiter));
});

app.listen(3001, () => {
  console.log("running");
});
