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
    res.status(201).json({status: 201, data: newUser});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: newUser, message: error.message});
  }
};

const addTicket = async (req, res) => {
  const {ticketInfo} = req.body;
  console.log("req.body in addTicket: ", req.body);
  let newTicket = {
    customerName: ticketInfo.clientInfo.name,
    customerEmail: ticketInfo.clientInfo.email,
    productType: ticketInfo.productTypeSelected,
    priority: ticketInfo.prioritySelected,
    shortDescrption: ticketInfo.shortDesc,
    description: ticketInfo.desc,
    impact: ticketInfo.impactSelected,
    dateOfTicketCreated: new Date().toLocaleDateString(),
    ticketStatus: "New",
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const table = await database
      .collection("Support_Tickets")
      .insertOne(newTicket);
    assert.equal(1, table.insertedCount);
    res.status(201).json({status: 201, data: newTicket});
    client.close();
  } catch (error) {
    res
      .status(500)
      .json({status: 500, data: newTicket, message: error.message});
  }
};

const getAllTickets = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database.collection("Support_Tickets").find().toArray();
    res.status(200).json({status: 200, data: data});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};
const getTicketDetail = async (req, res) => {
  const {getTicket} = req.params;
  let objID = require("mongodb").ObjectID;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database
      .collection("Support_Tickets")
      .findOne({_id: objID(getTicket)});
    res.status(200).json({status: 200, data: data});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

const getNewTickets = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database
      .collection("Support_Tickets")
      .find({ticketStatus: "New"})
      .toArray();
    res.status(200).json({status: 200, data: data});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

const getPendingTickets = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database
      .collection("Support_Tickets")
      .find({ticketStatus: "In Progress"})
      .toArray();
    res.status(200).json({status: 200, data: data});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

const getClosedTickets = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database
      .collection("Support_Tickets")
      .find({ticketStatus: "Resolved"})
      .toArray();
    res.status(200).json({status: 200, data: data});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

module.exports = {
  getClientAccount,
  registerClient,
  addTicket,
  getAllTickets,
  getTicketDetail,
  getNewTickets,
  getPendingTickets,
  getClosedTickets,
};
