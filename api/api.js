const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = express.Router();
const employeesRouter = require("./employees.js");
const menuRouter = require("./menu.js");

apiRouter.use(bodyParser.json());

// apiRouter.get("/employees", (res, req) => {
//   res.json({
//     testing: "employees"
//   });
// });

apiRouter.use("/employees", employeesRouter);
apiRouter.use("/menu", menuRouter);

module.exports = apiRouter;
