"use strict";
const {MongoClient} = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getClientAccount = async (req, res) => {
  const {emailId} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    let userFound = await database
      .collection("Clients")
      .findOne({username: emailId});
    console.log("getClientAccount userFound: ", userFound);
    res.status(200).send({status: "success", userFound: userFound});
  } catch (error) {
    res.status(404).send({status: "error", error: error.message});
  }
};

const registerClient = async (req, res) => {
  const {loginInfo, billingInfo} = req.body;
  let newUser = {
    username: loginInfo.email,
    loginInfo: loginInfo,
    billingInfo: billingInfo,
    isSupportPerson: false,
  };

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const table = await database.collection("Clients").insertOne(newUser);
    assert.equal(1, table.insertedCount);
    res.status(201).json({status: 201, data: req.body});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: req.body, message: error.message});
  }
};

const ticketCreated = async (req, res) => {};

module.exports = {getClientAccount, registerClient, ticketCreated};
