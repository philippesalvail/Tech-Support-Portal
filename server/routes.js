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
  getAllActiveAccounts,
  lockSupportAccount,
} = require("./handlers");

router.patch("/support/accounts/lockAccount/:username", lockSupportAccount);
router.post("/client/clientCreated", createClientAccount);
router.post("/client/ticketCreated", createClientTicket);
router.get("/client/:emailId", getClientAccount);
router.get("/support/getnewtickets", getNewTickets);
router.get("/support/getpendingtickets", getPendingTickets);
router.get("/support/getclosedtickets", getClosedTickets);
router.get("/support/getalltickets", getAllTickets);
router.put("/support/updateTicket", updateTicketDetail);
router.get("/support/:getTicket", getTicketDetail);
router.get("/support/accounts/:getActiveAccounts", getAllActiveAccounts);
router.get("/support/supportteams/getSupportTeams", getSupportTeams);
router.get("/support/supporter/getNewSupporters", getNewSupporters);
router.get("/support/supporter/getAllSupporters", getAllSupporters);
router.post("/support/supporter/createSupportUser", createSupportUser);
router.get("/support/supporter/:getSupportUser", getSupportUser);
router.put("/support/accounts/enableAccount", enableSupportAccount);
router.get("/support/accounts/:username", doesSupportUserNameExists);

module.exports = router;
