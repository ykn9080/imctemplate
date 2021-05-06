require("dotenv").config();
require("./config/dbConnect.js");
const express = require("express");
const app = express();
var morgan = require("morgan");
app.use(morgan("combined"));

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
require("./router/index.js")(app);
require("./swagger/index.js")(app);
const port = process.env.PORT || 9010;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
