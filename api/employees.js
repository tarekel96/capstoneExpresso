const express = require("express");
const employeesRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

employeesRouter.get("/api/employees", (req, res, next) => {});

module.exports = employeesRouter;
