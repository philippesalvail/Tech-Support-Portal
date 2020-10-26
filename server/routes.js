const router = require("express").Router();
const {
  getClientAccount,
  registerClient,
  addTicket,
  getAllTickets,
} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/client/clientCreated", registerClient);
router.post("/client/ticketCreated", addTicket);
router.get("/support/getalltickets", getAllTickets);

module.exports = router;
