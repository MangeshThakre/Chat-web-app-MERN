const express = require("express");
const router = express.Router();
const index = require("../controller/Controllercodeeditor.js");
const bodyparser = require("body-parser");

const multer = require("multer");
var jwt = require("jsonwebtoken");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/check", index.index);

router.post("/register", index.register);

router.post("/signin", index.signin);

router.get("/verify", Authorization, index.verify);

router.post("/newContact", Authorization, index.newContact);

router.get("/contactList", Authorization, index.contactList);

router.post("/message", Authorization, index.message);

router.get("/getMessage/:roomId", Authorization, index.getMessage);

router.post("/allMembers", Authorization, index.allMembers);

router.post("/addgroupmember", Authorization, index.addgroupmember);

router.post("/leavgroup", Authorization, index.leavgroup);

router.post("/otp", index.otp);

router.post("/updatepass", index.updatepass);

router.post(
  "/newgroup",
  Authorization,
  upload.single("groupImage"),
  index.newgroup
); 

router.post(
  "/updateimage",
  Authorization,
  upload.single("avatar"),
  index.updateimage
);



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
