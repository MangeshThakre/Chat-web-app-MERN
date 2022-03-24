const userModel = require("../schema/UserSchema.js");
var jwt = require("jsonwebtoken");
require("dotenv/config");
class codeeditorController {
  static index = (req, res) => {
    res.send({ data: "data" });
  };

  static register = async (req, res) => {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const phoneNo = req.body.phoneNo;
      const password = req.body.password;
      const gender = req.body.gender;
      const saveUserInfo = new userModel({
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        password: password,
        gender: gender,
      });
      const result = await saveUserInfo.save();
      res.send({
        status: 200,
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 200,
        Error: error,
      });
    }
  };

  static signin = async (req, res) => {
    if (req.body.phoneNo) {
      try {
        const response = await userModel.findOne({
          phoneNo: req.body.phoneNo,
          password: req.body.password,
        });
        if (response) {
          var token = jwt.sign(
            { id: response._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ Token: token });
        } else res.send({ Token: "invalid" });
      } catch (error) {
        console.log(error);
        res.send({ Error: error });
      }
    } else if (req.body.email) {
      try {
        const response = await userModel.findOne({
          emailId: req.body.phoneNo,
          password: req.body.password,
        });
        if (response) {
          var token = jwt.sign(
            { id: response._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ Token: token });
        } else {
          res.send({ Error: error });
        }
      } catch (error) {
        res.send({ Error: error });
      }
    }
  };

  static verify = async (req, res) => {
    try {
      const user_id = req.user.id;
      const response = await userModel.findById(user_id);
      res.send(response);
    } catch (error) {
      res.send({ statu: 401, error });
    }
  };
}

module.exports = codeeditorController;
