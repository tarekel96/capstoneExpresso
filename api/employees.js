const express = require("express");
const employeesRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || ".../database.sqlite" // "./database.sqlite"
);

// testing route with Postman
employeesRouter.get("/testing", (req, res) => {
  res.json({
    employeeTest: "works"
  });
});

employeesRouter.param("employeeId", (req, res, next, employeeId) => {
  const sql = "SELECT * FROM Employee WHERE Employee.id = $employeeId";
  const values = { $employeeId: employeeId };
  db.get(sql, values, (error, employee) => {
    if (error) {
      next(error);
    } else if (employee) {
      req.employee = employee;
      res.status(200).json({
        employee: employee
      });
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

employeesRouter.get("/", (req, res, next) => {
  db.all(
    "SELECT * FROM Employee WHERE is_current_employee = 1",
    (err, employees) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({
          employees: employees
        });
      }
    }
  );
});

employeesRouter.get("/:employeeId", (req, res, next) => {
  res.status(200).json({ employee: req.employee });
});

module.exports = employeesRouter;
