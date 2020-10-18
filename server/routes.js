const router = require("express").Router();
const {getClientAccount, registerClient} = require("./handlers");

router.get("/client/:emailId", getClientAccount);
router.post("/clientCreated", registerClient);

module.exports = router;
