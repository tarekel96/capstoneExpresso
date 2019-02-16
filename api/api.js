const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = express.Router();
const employeesRouter = require("./employees.js");
const menuRouter = require("./menu.js");

apiRouter.use(bodyParser.json());

// testing route with Postman
apiRouter.get("/test", (req, res) => {
  res.json({
    testing: "employees"
  });
});

apiRouter.use("/employees", employeesRouter);
apiRouter.use("/menu", menuRouter);

module.exports = apiRouter;
