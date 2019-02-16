const express = require("express");
const menuRouter = express.Router();

module.exports = menuRouter;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

const menuItemsRouter = require("./menuItems");

menuRouter.param("menuId", (req, res, next, menuId) => {
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

menuRouter.use("/:menuId/menuItems", menuItemsRouter);

menuRouter.get("/", (req, res, next) => {
  const sql = "SELECT * FROM Menu";
  db.all(sql, (error, rows) => {
    if (error) {
      next(error);
    } else {
      res.status(200).send({ menus: rows });
    }
  });
});

menuRouter.get("/:menuId", (req, res, next) => {
  res.status(200).send({ menu: req.menu });
});

menuRouter.post("/", (req, res, next) => {
  const title = req.body.menu.title;

  if (!title) {
    return res.sendStatus(400);
  }

  const sql = "INSERT INTO Menu(title) VALUES($title)";
  const values = {
    $title: title
  };
  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Menu WHERE id = ${this.lastID}`, (error, row) => {
        if (error) {
          next(error);
        } else {
          res.status(201).send({ menu: row });
        }
      });
    }
  });
});

menuRouter.put("/:menuId", (req, res, next) => {
  const menuId = req.params.menuId,
    title = req.body.menu.title;

  if (!title) {
    return res.sendStatus(400);
  }

  const sql = "UPDATE Menu SET title = $title WHERE id = $menuId";
  const values = {
    $title: title,
    $menuId: menuId
  };

  db.run(sql, values, error => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Menu WHERE id = ${menuId}`, (error, row) => {
        if (error) {
          next(error);
        } else {
          res.status(200).send({ menu: row });
        }
      });
    }
  });
});

menuRouter.delete("/:menuId", (req, res, next) => {
  const menuId = req.params.menuId;
  const sql1 = `SELECT * FROM MenuItem WHERE menu_id = ${menuId}`;
  db.get(sql1, (error, row) => {
    if (error) {
      next(error);
    } else if (row) {
      res.sendStatus(400);
    } else {
      db.run(`DELETE FROM Menu WHERE id = ${menuId}`, error => {
        res.sendStatus(204);
      });
    }
  });
});
