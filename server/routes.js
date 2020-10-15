const router = require("express").Router();
const {getClientAccount} = require("./handlers");

router.get("/client/:emailId", getClientAccount);

module.exports = router;
