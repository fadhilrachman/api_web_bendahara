const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/padilDashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("ini db" + process.env.urdlDb);
const db = mongoose.connection;

module.exports = db;
