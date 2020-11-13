const router = require("express").Router();
const {
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
  addNoteToTicket,
} = require("./handlers");

router.post("/client/clientCreated", createClientAccount);
router.post("/client/tickets/ticketCreated", createClientTicket);
router.get("/client/getClientProfile/:username", getClientProfile);
router.get("/client/:emailId", verifyClientAccount);

router.get("/support/tickets/getnewtickets/:username", getNewTickets);
router.get("/support/tickets/getpendingtickets/:username", getPendingTickets);
router.get("/support/tickets/getresolvedtickets/:username", getResolvedTickets);
router.get("/support/tickets/getalltickets/:username", getAllTickets);

router.put("/support/tickets/updateTicket", updateTicketDetail);
router.patch("/support/tickets/addNoteToTicket/:ticketId", addNoteToTicket);
router.get("/support/tickets/:getTicket", getTicketDetail);

router.put("/support/accounts/enableAccount", activateSupportAccount);
router.get("/support/accounts/:getActiveAccounts", getAllActiveAccounts);

router.get(
  "/support/accounts/checkUsername/:username",
  doesSupportUserNameExists
);
router.patch(
  "/support/accounts/changeAccountState/:username",
  changeAccountState
);

router.get("/support/supportteams/getSupportTeams", getSupportTeams);
router.get("/support/supportteams/tickets/:getTeamTickets", getTeamTickets);
router.get("/support/supportteams/accounts/:getTeamAccounts", getTeamAccounts);

router.get("/support/supporter/getNewSupportAccounts", getNewSupportAccounts);
router.get("/support/supporter/getAllSupporters", getAllSupporterAccounts);
router.post("/support/supporter/createSupportUser", createSupporter);
router.get("/support/supporter/:getSupportUser", getSupporter);
router.get("/support/supporter/searchSupporter/:username", searchSupporter);

router.patch("/support/supporter/updateSupporter/:username", updateSupporter);
router.patch("/support/accounts/lockAccount/:username", lockSupportAccount);
router.post("/support/accounts/createAccount", createSupportAccount);

module.exports = router;
