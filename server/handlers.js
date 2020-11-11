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

const getClientProfile = async (req, res) => {
  const {username} = req.params;
  console.log("username in getClientProfile: ", username);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    let userFound = await database
      .collection("Clients")
      .findOne({username: username});
    let clientTickets = await database
      .collection("Support_Tickets")
      .find({customerUsername: username})
      .toArray();
    console.log("clientTickets: ", clientTickets);
    res.status(200).send({
      status: "success",
      userFound: userFound,
      clientTickets: clientTickets,
    });
    client.close();
  } catch (error) {
    res.status(404).send({status: "error", error: error.message});
  }
};

const verifyClientAccount = async (req, res) => {
  const {emailId} = req.params;
  console.log("emailId: ", emailId);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    let userFound = await database
      .collection("Clients")
      .findOne({"loginInfo.email": emailId});
    if (userFound) {
      let clientTickets = await database
        .collection("Support_Tickets")
        .find({customerEmail: emailId})
        .toArray();
      res.status(200).send({
        status: "success",
        userFound: userFound,
        tickets: clientTickets,
      });
    }
    client.close();
  } catch (error) {
    res.status(404).send({status: "error", error: error.message});
  }
};

const createClientAccount = async (req, res) => {
  console.log("createClientAccount: ", req.body);
  const {loginInfo, billingInfo} = req.body;
  let newUser = {
    username: billingInfo.username,
    loginInfo: loginInfo,
    billingInfo: billingInfo,
    isSupportPerson: false,
  };

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");

    const usernameFound = await database
      .collection("Clients")
      .findOne({username: billingInfo.username});

    if (usernameFound) {
      res.status(200).json({
        status: 200,
        message:
          "Account for " +
          billingInfo.username +
          " already exists.\nAccount not created",
        accountCreated: false,
      });
      return;
    } else {
      console.log("new user: ", newUser);
      const table = await database.collection("Clients").insertOne(newUser);
      assert.equal(1, table.insertedCount);
      res.status(201).json({
        status: 201,
        data: newUser,
        message:
          "Account for " +
          newUser.loginInfo.given_name +
          " " +
          newUser.loginInfo.family_name +
          " has been created successfully",
        accountCreated: true,
      });
    }
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: newUser, message: error.message});
  }
};

const createClientTicket = async (req, res) => {
  const {ticketInfo, clientAccount} = req.body;

  console.log("ticketInfo createClientTicket: ", ticketInfo);
  console.log("clientAccount createClientTicket: ", clientAccount);

  let newTicket = {
    customerUsername: ticketInfo.clientUsername,
    customerName:
      ticketInfo.clientAccount.given_name +
      " " +
      ticketInfo.clientAccount.family_name,
    customerEmail: ticketInfo.clientAccount.email,
    productType: ticketInfo.productTypeSelected,
    priority: ticketInfo.prioritySelected,
    shortDescription: ticketInfo.shortDesc,
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
    res.status(201).json({
      status: 201,
      message:
        "Ticket for issue: " +
        newTicket.shortDescription +
        " was created successfully",
    });
    client.close();
    console.log("success in createClientTicket: ");
  } catch (error) {
    console.log("error in createClientTicket: ", error.message);
    res
      .status(500)
      .json({status: 500, data: newTicket, message: error.message});
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
      : res.status(409).json({
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
  const {username} = req.params;

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    if (username === "admin") {
      const data = await database
        .collection("Support_Tickets")
        .find({ticketStatus: "New"})
        .toArray();
      res.status(200).json({status: 200, data: data, username: username});
    } else {
      const agent = await database
        .collection("Supporters")
        .findOne({username: username});

      const getAgentTickets = await database
        .collection("Support_Tickets")
        .find({assignee: agent.name})
        .toArray();
      agent && getAgentTickets
        ? res.status(200).json({
            status: 200,
            agent: agent,
            getAgentTickets: getAgentTickets,
            username: username,
          })
        : res.status(409).json({
            status: 409,
            message: "Something went wrong!, Please Update again",
          });
    }
    client.close();
  } catch (error) {
    console.log("error getNewTickets: ", error);
    res.status(500).json({status: 500, message: error.message});
  }
};

const getPendingTickets = async (req, res) => {
  const {username} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    if (username == "admin") {
      const data = await database
        .collection("Support_Tickets")
        .find({ticketStatus: "In Progress"})
        .toArray();
      res.status(200).json({status: 200, data: data, username: username});
    }

    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

const getResolvedTickets = async (req, res) => {
  const {username} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    if (username == "admin") {
      const data = await database
        .collection("Support_Tickets")
        .find({ticketStatus: "Resolved"})
        .toArray();
      res.status(200).json({status: 200, data: data});
    }
    client.close();
  } catch (error) {
    res.status(500).json({status: 500, data: data, message: error.message});
  }
};

const getAllTickets = async (req, res) => {
  const {username} = req.params;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");
    if (username == "admin") {
      const data = await database
        .collection("Support_Tickets")
        .find()
        .toArray();
      res.status(200).json({status: 200, data: data});
    }

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

const getNewSupportAccounts = async (req, res) => {
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

const getAllSupporterAccounts = async (req, res) => {
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

    const userName = await database
      .collection("Supporters")
      .findOne({username: username});

    if (userName) {
      res.status(200).json({
        status: 200,
        message:
          "Account for " +
          userName.username +
          " already exists.\nAccount not created",
        accountCreated: false,
      });
      return;
    }

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
          accountCreated: true,
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
    res.status(200).json({status: 200, supporter: supporter ? true : false});
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

const createSupportAccount = async (req, res) => {
  const {
    name,
    team,
    username,
    password,
    isLocked,
    isValidated,
    isEnabled,
  } = req.body;

  const newSupporter = {
    name: name,
    team: team,
    username: username,
    password: password,
    isLocked: isLocked,
    isValidated: isValidated,
    isEnabled: isEnabled,
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const database = client.db("Tech_Support");

    const supporter = await database
      .collection("Supporters")
      .findOne({username: username});

    if (supporter) {
      res.status(200).json({
        status: 200,
        message:
          "Account for " +
          supporter.username +
          " already exists.\nAccount not created",
        accountCreated: false,
      });
      return;
    }

    const agent = await database
      .collection("Supporters")
      .insertOne(newSupporter);

    const teamAssigned = await database
      .collection("Support_Teams")
      .update({supportName: team}, {$push: {supporters: newSupporter.name}});

    if (teamAssigned && agent) {
      console.log("inside ");
      res.status(201).json({
        status: 201,
        message:
          "Support Account for " +
          newSupporter.name +
          " been created Successfully",
        accountCreated: true,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "Something went wrong!, Please submit again",
      });
    }
  } catch (error) {
    console.log("error in createAccount: ", error);
    res.status(500).json({status: 500, message: error.message});
  }
};

module.exports = {
  verifyClientAccount,
  createClientAccount,
  createClientTicket,
  getAllTickets,
  getTicketDetail,
  getNewTickets,
  getPendingTickets,
  getResolvedTickets,
  updateTicketDetail,
  getSupportTeams,
  getSupporter,
  createSupporter,
  getNewSupportAccounts,
  activateSupportAccount,
  getAllSupporterAccounts,
  doesSupportUserNameExists,
  getAllActiveAccounts,
  lockSupportAccount,
  getTeamAccounts,
  getTeamTickets,
  changeAccountState,
  updateSupporter,
  searchSupporter,
  createSupportAccount,
  getClientProfile,
};
