const express = require("express");
const app = express();
const pm2_5Route = require("./pm2_5");

app.use("/pm2_5", pm2_5Route);

module.exports = app;