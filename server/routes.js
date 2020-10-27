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
} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/client/clientCreated", registerClient);
router.post("/client/ticketCreated", addTicket);

router.get("/support/getnewtickets", getNewTickets);
router.get("/support/getpendingtickets", getPendingTickets);
router.get("/support/getclosedtickets", getClosedTickets);
router.get("/support/getalltickets", getAllTickets);
router.get("/support/:getTicket", getTicketDetail);

module.exports = router;
