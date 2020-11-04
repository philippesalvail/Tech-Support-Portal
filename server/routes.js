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
} = require("./handlers");

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
router.get("/support/supportteams/tickets/:getTeamTickets", getTeamTickets);
router.get("/support/supportteams/accounts/:getTeamAccounts", getTeamAccounts);
router.get("/support/supporter/getNewSupporters", getNewSupporters);
router.get("/support/supporter/getAllSupporters", getAllSupporters);
router.post("/support/supporter/createSupportUser", createSupporter);
router.get("/support/supporter/:getSupportUser", getSupporter);
router.put("/support/accounts/enableAccount", activateSupportAccount);
router.get("/support/accounts/:username", doesSupportUserNameExists);
router.patch("/support/accounts/lockAccount/:username", lockSupportAccount);
router.patch(
  "/support/accounts/changeAccountState/:username",
  changeAccountState
);

module.exports = router;
