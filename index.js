const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// const db = require("./config/mongoose");
app.use(express.urlencoded());
// use express router
app.use("/", require("./routes/"));
app.set("view engine", "ejs");
app.set("views", "./views");
// app.set("layout extractStyles", true);
// app.set("layout extractScripts", true);

app.listen(port, function(err) {
  if (err) {
    console.log(`Error in running the server on port ${port}: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
