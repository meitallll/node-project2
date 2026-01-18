const dbSingleton = require('../../DB/dbSingelton');


const db = dbSingleton.getConnection();
const path = require("path");
const express = require("express");
const router = express.Router();


const validateUserExistance = (req, res, next) => {
  const query =
    "select * From users WHERE userName=?";
    db.query(query, [userType, username, email, password], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if(results[0].username==req.body.username)
        alert("user already exists!");
        return;
    });
  next();
};

router.get("/", (req, res, next) => {
  res.redirect("../login.html");
});

router.post("/register", (req, res, next) => {
  const { userType, username, email, password } = req.body;
  console.log(req.body);
  const query =
    "INSERT INTO users (userType, userName, password,email) VALUES (?, ?, ?,?)";

  db.query(query, [userType, username, email, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.redirect("/login.html");
  });
});
module.exports = router;
