require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
console.log(process.env.URL);
// const url = "mongodb://localhost:27017/covidTracker";

const connectToMongo = () => {
  mongoose.connect(process.env.URL, () => {
    console.log("connected successfully");
  });
};

module.exports = connectToMongo;
