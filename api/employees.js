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

// artistsRouter.get('/', (req, res, next) => {
//   db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1',
//     (err, artists) => {
//       if (err) {
//         next(err);
//       } else {
//         res.status(200).json({artists: artists});
//       }
//     });
// });

module.exports = employeesRouter;
