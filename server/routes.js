const router = require("express").Router();
const {
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
  getSupportUser,
  createSupportUser,
  getNewSupporters,
  enableSupportAccount,
  getAllSupporters,
  doesSupportUserNameExists,
} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/client/clientCreated", createClientAccount);
router.post("/client/ticketCreated", createClientTicket);
router.get("/support/getnewtickets", getNewTickets);
router.get("/support/getpendingtickets", getPendingTickets);
router.get("/support/getclosedtickets", getClosedTickets);
router.get("/support/getalltickets", getAllTickets);
router.get("/support/:getTicket", getTicketDetail);
router.put("/support/updateTicket", updateTicketDetail);
router.get("/support/supportteams/getSupportTeams", getSupportTeams);
router.get("/support/supporter/getNewSupporters", getNewSupporters);
router.get("/support/supporter/getAllSupporters", getAllSupporters);
router.get("/support/supporter/:getSupportUser", getSupportUser);
router.put("/support/supporter/accounts/enabledAccount", enableSupportAccount);
router.get("/support/supporter/accounts/:username", doesSupportUserNameExists);
router.post("/support/supporter/createSupportUser", createSupportUser);

module.exports = router;
