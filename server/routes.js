const router = require("express").Router();
const {
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
} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/client/clientCreated", registerClient);
router.post("/client/ticketCreated", addTicket);
router.get("/support/getnewtickets", getNewTickets);
router.get("/support/getpendingtickets", getPendingTickets);
router.get("/support/getclosedtickets", getClosedTickets);
router.get("/support/getalltickets", getAllTickets);
router.get("/support/:getTicket", getTicketDetail);
router.put("/support/updateTicket", updateTicketDetail);
router.get("/support/supportteams/getSupportTeams", getSupportTeams);
router.get("/support/supporter/:getSupportUser", getSupportUser);
router.get("/support/supporter/getNewSupporters", getNewSupporters);
router.post("/support/supporter/createSupportUser", createSupportUser);

module.exports = router;
