const express = require("express");
const cors = require("cors");
const app = express();
//const api = require('./routes')
const template = require("./controller/template");

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", function (req, res) {
  res.send("home");
});

app.get("/new", template);

module.exports = app;
