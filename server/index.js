// cannot use undeclared variables

"use strict";
const express = require("express");
// middleware node module

const bodyParser = require("body-parser");
// parses all request bodies

const morgan = require("morgan");
// express middleware, logger

const cors = require("cors");

const {MONGO_URI} = process.env;

const PORT = process.env.PORT || 5678;

const app = express();

app
  .use(cors())
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(express.urlencoded({extended: false}))
  .use("/", express.static(__dirname + "/"))
  .use(require("./routes"));

const server = app.listen(PORT, function () {
  console.log("listening on port " + server.address().port);
});
