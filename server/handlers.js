"use strict";
const {MongoClient} = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log("handlers reading");
const getClientAccount = (req, res) => {
  // const {clientId} = req.body;
  console.log("clientId in getClientAccount: ");
  res.status(200).send({message: "this is a message"});
};

module.exports = {getClientAccount};
