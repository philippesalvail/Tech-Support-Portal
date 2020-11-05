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
  updateSupporter,
} = require("./handlers");

router.post("/client/clientCreated", createClientAccount);
router.post("/client/tickets/ticketCreated", createClientTicket);
router.get("/client/account/:emailId", getClientAccount);

router.get("/support/tickets/getnewtickets", getNewTickets);
router.get("/support/tickets/getpendingtickets", getPendingTickets);
router.get("/support/tickets/getclosedtickets", getClosedTickets);
router.get("/support/tickets/getalltickets", getAllTickets);
router.put("/support/tickets/updateTicket", updateTicketDetail);
router.get("/support/tickets/:getTicket", getTicketDetail);

router.get("/support/accounts/:getActiveAccounts", getAllActiveAccounts);
router.put("/support/accounts/enableAccount", activateSupportAccount);
router.get("/support/accounts/:username", doesSupportUserNameExists);
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

router.patch("/support/supporter/updateSupporter/:username", updateSupporter);

router.patch("/support/accounts/lockAccount/:username", lockSupportAccount);

module.exports = router;
