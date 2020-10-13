"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({path: "../client/.env"});

const {MONGO_URI} = process.env;

const PORT = 5678;

const app = express();

express()
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
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({extended: false}))
  .use("/", express.static(__dirname + "/"));

app.use(express.json());
app.use(morgan("dev"));
app.use("/", require("./routes"));

const server = app.listen(PORT, function () {
  console.log("listening on port " + server.address().port);
});
