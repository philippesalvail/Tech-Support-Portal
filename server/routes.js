const router = require("express").Router();
const {
  getClientAccount,
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
  createSupportAccount,
} = require("./handlers");

router.post("/client/clientCreated", createClientAccount);
router.post("/client/tickets/ticketCreated", createClientTicket);
router.get("/client/account/:emailId", getClientAccount);

router.get("/support/tickets/getnewtickets/:supporter", getNewTickets);
router.get("/support/tickets/getpendingtickets/:supporter", getPendingTickets);
router.get(
  "/support/tickets/getresolvedtickets/:supporter",
  getResolvedTickets
);
router.get("/support/tickets/getalltickets/:supporter", getAllTickets);

router.put("/support/tickets/updateTicket", updateTicketDetail);
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

router.get("/support/supporter/getNewSupporters", getNewSupporters);
router.get("/support/supporter/getAllSupporters", getAllSupporters);
router.post("/support/supporter/createSupportUser", createSupporter);
router.get("/support/supporter/:getSupportUser", getSupporter);
router.get("/support/supporter/searchSupporter/:username", searchSupporter);

router.patch("/support/supporter/updateSupporter/:username", updateSupporter);
router.patch("/support/accounts/lockAccount/:username", lockSupportAccount);
router.post("/support/accounts/createAccount", createSupportAccount);

module.exports = router;
