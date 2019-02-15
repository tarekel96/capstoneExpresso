const express = require("express");
const apiRouter = express.Router();
const employeesRouter = require("./employees.js");
const menuRouter = require("./menu.js");

apiRouter.use("/employees", employeesRouter);
apiRouter.use("/menu", menuRouter);

module.exports = apiRouter;
