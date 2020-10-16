const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/db-oas")
  .then((db) => console.log("db connected"))
  .catch((err) => console.error(err));
