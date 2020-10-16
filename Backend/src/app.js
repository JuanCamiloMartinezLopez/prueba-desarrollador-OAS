const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.set("port", 3000);

//middlewares
//app.use(cors);
app.use(morgan("dev"));

//routes
app.use("/api", require("./routes/index.js"));

module.exports = app;
