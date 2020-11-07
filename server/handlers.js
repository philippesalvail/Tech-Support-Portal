"use strict";
const {MongoClient} = require("mongodb");
const assert = require("assert");
const {error} = require("console");
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
    res.status(200).send({status: "success", userFound: userFound});
    client.close();
  } catch (error) {
    res.status(404).send({status: "error", error: error.message});
  }
};

const createClientAccount = async (req, res) => {
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
    res.status(201).json({
      status: 201,
      data: newUser,
      message: "Account for " + loginInfo.name + " has been created",
    });
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: newUser, message: error.message});
  }
};

const createClientTicket = async (req, res) => {
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
    data && teams
      ? res.status(200).json({status: 200, data: data, teams: teams})
      : res.status(404).json({
          status: 200,
          message: "Something went wrong, please submit again",
        });

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

const searchSupporter = async (req, res) => {
  const {username} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const user = await database
      .collection("Supporters")
      .findOne({username: username});

    res.status(200).json({
      status: 200,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
    });
  }
};

const getSupporter = async (req, res) => {
  const {getSupportUser} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const user = await database
      .collection("Supporters")
      .findOne({username: getSupportUser});
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

const createSupporter = async (req, res) => {
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
      .find({isValidated: false})
      .toArray();
    res.status(200).json({status: 200, accounts: supporters});
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const getAllSupporters = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const supporters = await database
      .collection("Supporters")
      .find({isValidated: true})
      .toArray();
    res.status(200).json({status: 200, accounts: supporters});
  } catch (error) {
    res.status(500).json({status: 200, message: error.message});
  }
};

const changeAccountState = async (req, res) => {
  const {username} = req.params;
  const {isEnabled} = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const updateSupporter = await database.collection("Supporters").updateOne(
      {username: username},
      {
        $set: {
          isEnabled: isEnabled,
        },
      }
    );
    isEnabled
      ? res.status(200).json({
          status: 200,
          message: "Account for " + username + " has been re-enabled",
        })
      : res.status(200).json({
          status: 200,
          message: "Account for " + username + " has been disabled",
        });
  } catch (error) {
    res.status(500).json({status: 200, message: error.message});
  }
};

const updateSupporter = async (req, res) => {
  const {username} = req.params;
  const {newTeam, supportUsername, password, oldTeam, name} = req.body;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const updateSupporter = await database.collection("Supporters").updateOne(
      {username: username},
      {
        $set: {
          team: newTeam,
          username: supportUsername,
          password: password,
        },
      }
    );
    const addSupporterToTeam = await database
      .collection("Support_Teams")
      .update({supportName: newTeam}, {$push: {supporters: name}});

    const removeSupporterFromTeam = await database
      .collection("Support_Teams")
      .update({supportName: oldTeam}, {$pull: {supporters: name}});
    updateSupporter && addSupporterToTeam && removeSupporterFromTeam
      ? res.status(200).json({
          status: 200,
          message: "Account for " + name + " has been updated successfully",
        })
      : res.status(409).json({
          status: 409,
          message: "Something went wrong!, Please Update again",
        });
  } catch (error) {
    res.status(500).json({status: 200, message: error.message});
  }
};

const activateSupportAccount = async (req, res) => {
  const supportaccount = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const supporter = await database.collection("Supporters").updateOne(
      {_id: objID(supportaccount._id)},
      {
        $set: {
          name: supportaccount.name,
          username: supportaccount.username,
          password: supportaccount.password,
          team: supportaccount.team,
          isLocked: supportaccount.isLocked,
          isValidated: supportaccount.isValidated,
          isEnabled: supportaccount.isEnabled,
        },
      }
    );

    const teamAssigned = await database
      .collection("Support_Teams")
      .update(
        {supportName: supportaccount.team},
        {$push: {supporters: supportaccount.name}}
      );
    teamAssigned && supporter
      ? res.status(201).json({
          status: 200,
          accounts: supporter,
          teamAssigned: teamAssigned,
          message:
            "Support Account for " +
            supportaccount.name +
            " has been created Successfully",
        })
      : res.status(409).json({
          status: 409,
          message: "Something went wrong!, Please submit again",
        });
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

// const changeAccountState = async (req, res) => {
//   const {username} = req.params;
//   const {isEnabled} = req.body;
//   try {
//     const client = await MongoClient(MONGO_URI, options);
//     await client.connect();
//     const database = client.db("Tech_Support");
//     const supporter = await database.collection("Supporters").updateOne(
//       {username: username},
//       {
//         $set: {
//           isEnabled: isEnabled,
//         },
//       }
//     );
//     let state = isEnabled
//       ? "Account for username " + username + " has been re-enabled"
//       : "Account for username " + username + " has been disabled";

//     res.status(200).json({status: 200, message: state});
//   } catch (error) {
//     res.status(500).json({status: 500, message: error.message});
//   }
// };

const doesSupportUserNameExists = async (req, res) => {
  const {username} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const supporter = await database
      .collection("Supporters")
      .findOne({username: username});
    res.status(200).json({status: 200, supporter: supporter});
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};
const getAllActiveAccounts = async (req, res) => {
  const {getActiveAccounts} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const accounts = await database
      .collection("Supporters")
      .find({isValidated: getActiveAccounts})
      .toArray();
    res.status(200).json({status: 200, accounts: accounts});
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const lockSupportAccount = async (req, res) => {
  const {username} = req.params;
  const {isLocked} = req.body;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    await database.collection("Supporters").updateOne(
      {username: username},
      {
        $set: {isLocked: isLocked},
      }
    );
    res.status(200).json({
      status: 200,
      message:
        "User account: " +
        username +
        " has been locked due to too many failed attempts",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({status: 500, message: error.message});
  }
};

const getTeamAccounts = async (req, res) => {
  const {getTeamAccounts} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const accounts = await database
      .collection("Supporters")
      .find({team: getTeamAccounts})
      .toArray();
    res.status(200).json({status: 200, accounts: accounts});
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const getTeamTickets = async (req, res) => {
  const {getTeamTickets} = req.params;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    const tickets = await database
      .collection("Support_Tickets")
      .find({assignmentGroup: getTeamTickets})
      .toArray();
    res.status(200).json({status: 200, tickets: tickets});
  } catch (error) {
    res.status(500).json({status: 500, message: error.message});
  }
};

const createAccount = async (req, res) => {};

module.exports = {
  getClientAccount,
  createClientAccount,
  createClientTicket,
  getAllTickets,
  getTicketDetail,
  getNewTickets,
  getPendingTickets,
  getClosedTickets,
  updateTicketDetail,
  getSupportTeams,
  getSupporter,
  createSupporter,
  getNewSupporters,
  activateSupportAccount,
  getAllSupporters,
  doesSupportUserNameExists,
  getAllActiveAccounts,
  lockSupportAccount,
  getTeamAccounts,
  getTeamTickets,
  changeAccountState,
  updateSupporter,
  searchSupporter,
  createAccount,
};
