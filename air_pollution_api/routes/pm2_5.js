const express = require("express");
const router = express.Router();
const pm2_5Controller = require("../controllers/pm2_5");

router.get("/", pm2_5Controller.getPm2_5);

module.exports = router;