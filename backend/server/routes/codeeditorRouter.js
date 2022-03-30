const express = require("express");
const router = express.Router();
const index = require("../controller/Controllercodeeditor.js");
const bodyparser = require("body-parser");
var jwt = require("jsonwebtoken");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.get("/check", index.index);

router.post("/register", index.register);

router.post("/signin", index.signin);

router.get("/verify", Authorization, index.verify);

router.post("/newContact", Authorization, index.newContact);

router.get("/contactList", Authorization, index.contactList);
function Authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
