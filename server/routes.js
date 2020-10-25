const router = require("express").Router();
const {getClientAccount, registerClient, addTicket} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/client/clientCreated", registerClient);
router.post("/client/ticketCreated", addTicket);

module.exports = router;
