const express = require("express");
const menuRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

const menuItemsRouter = require("./menu-items");

menusRouter.param("menuId", (req, res, next, menuId) => {
  const sql = "SELECT * FROM Menu WHERE id = $id";
  const values = {
    $id: menuId
  };
  db.get(sql, values, (error, row) => {
    if (error) {
      next(error);
    } else if (row) {
      req.menu = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

menusRouter.use("/:menuId/menu-items", menuItemsRouter);

menusRouter.get("/", (req, res, next) => {
  const sql = "SELECT * FROM Menu";
  db.all(sql, (error, rows) => {
    if (error) {
      next(error);
    } else {
      res.status(200).send({ menus: rows });
    }
  });
});

module.exports = menuRouter;
