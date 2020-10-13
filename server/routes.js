const router = require("express").Router();
const {getClientAccount} = require("./handlers");

console.log("I am before the route");

router.get("/client", getClientAccount);

module.exports = router;
