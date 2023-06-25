const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();
require("dotenv").config();

app.use(cors());
app.use("/api", routes);

const on_port = process.env.PORT || 3000;

app.listen(on_port, () => {
    console.log("server running at :" + on_port);
})