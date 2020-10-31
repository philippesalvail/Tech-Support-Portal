"use strict";
const {MongoClient} = require("mongodb");
const assert = require("assert");
require("dotenv").config();
let objID = require("mongodb").ObjectID;

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
    client.close();
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
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const data = await database
      .collection("Support_Tickets")
      .findOne({_id: objID(getTicket)});
    const teams = await database.collection("Support_Teams").find().toArray();
    res.status(200).json({status: 200, data: data, teams: teams});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const getSupportTeams = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const teams = await database.collection("Support_Teams").find().toArray();
    res.status(200).json({status: 200, teams: teams});
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const updateTicketDetail = async (req, res) => {
  console.log("req.body: ", req.body);
  const {
    _id,
    customerEmail,
    customerName,
    dateOfTicketCreated,
    description,
    impact,
    priority,
    risk,
    ticketStatus,
    assignmentGroup,
    assignee,
  } = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    await database.collection("Support_Tickets").updateOne(
      {_id: objID(_id)},
      {
        $set: {
          customerEmail: customerEmail,
          customerName: customerName,
          dateOfTicketCreated: dateOfTicketCreated,
          description: description,
          impact: impact,
          priority: priority,
          risk: risk,
          ticketStatus: ticketStatus,
          assignmentGroup: assignmentGroup,
          assignee: assignee,
        },
      }
    );
    res.status(200).json({message: `Ticket :${_id} updated sucessfully`});
  } catch (error) {
    res.status(404).json({status: 404, _id: _id, message: error.message});
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

const getSupportUser = async (req, res) => {
  const {getSupportUser} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const user = await database
      .collection("Supporters")
      .findOne({username: getSupportUser});
    console.log("user in getSupportUser: ", user);
    res.status(200).json({
      status: 200,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 200,
      user: user,
      message: "Server Error",
    });
  }
};

const createSupportUser = async (req, res) => {
  const supporterInfo = req.body;
  const supporter = {
    name: supporterInfo.firstname + " " + supporterInfo.lastname,
    team: supporterInfo.team,
    isValidated: supporterInfo.isValidated,
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const user = await database.collection("Supporters").insertOne(supporter);
    assert.equal(1, user.insertedCount);
    res.status(201).json({status: 201, data: supporter});
  } catch (error) {
    res
      .status(500)
      .json({status: 500, data: supporter, nessage: error.message});
  }
};

const getNewSupporters = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const supporters = await database
      .collection("Supporters")
      .find({isValidated: false});
    assert.equal(1, user.insertedCount);
    res.status(201).json({status: 201, supporters: supporters});
  } catch (error) {
    res
      .status(500)
      .json({status: 500, data: supporter, nessage: error.message});
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
  updateTicketDetail,
  getSupportTeams,
  getSupportUser,
  createSupportUser,
  getNewSupporters,
};
