//require("./database");
const app = require("./app.js");

//starting
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
