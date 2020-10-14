const router = require("express").Router();
const {getClientAccount} = require("./handlers");

router.get("/client", getClientAccount);

module.exports = router;
