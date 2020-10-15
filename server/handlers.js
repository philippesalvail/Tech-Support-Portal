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
  const {emailId} = req.body;
  console.log("emailId: ", emailId);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    let userFound = await database
      .collection("Clients")
      .findOne({emailId: emailId});
    res.status(200).send({status: "success", userFound: userFound});
  } catch (error) {
    res.status(404).send({status: "error", error: error.message});
  }
};

module.exports = {getClientAccount};
