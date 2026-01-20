const express = require("express");
const router = express.Router();

const dbSingleton = require("../../DB/dbSingelton");
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const q = "SELECT * FROM events ORDER BY date DESC";
  db.query(q, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(rows);
  });
});

router.post("/", (req, res) => {
  const { photographer_id, name, date, place, status } = req.body;

  const q =
    "INSERT INTO events (photographer_id, name, date, place, status) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [photographer_id, name, date, place, status], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "event added", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { photographer_id, name, date, place, status } = req.body;

  const q =
    "UPDATE events SET photographer_id=?, name=?, date=?, place=?, status=? WHERE id=?";
  db.query(
    q,
    [photographer_id, name, date, place, status, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send("updated");
    },
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM events WHERE id=?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("deleted");
  });
});

module.exports = router;
