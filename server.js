const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // middleware for connecting Express routes
const errorhandler = require("errorhandler");
const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const apiRouter = require("./api/api");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
//middleware sets up all of our paths to start with api
app.use("/api", apiRouter);

app.use(errorhandler());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
