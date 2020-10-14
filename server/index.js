"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({path: "../client/.env"});

const {MONGO_URI} = process.env;

const PORT = 5678;

const app = express();

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(express.urlencoded({extended: false}))
  .use("/", express.static(__dirname + "/"))
  .use(express.json())
  .use(require("./routes"));

const server = app.listen(PORT, function () {
  console.log("listening on port " + server.address().port);
});
