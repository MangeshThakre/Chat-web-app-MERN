const userModel = require("../schema/UserSchema.js");
const contactModel = require("../schema/newContactSchema.js");
const chatModel = require("../schema/chatSchema.js");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const md5 = require("md5");

const { response } = require("express");
require("dotenv/config");

class codeeditorController {
  static index = (req, res) => {
    res.send({ data: "data" });
  };

  static register = async (req, res) => {
    const userName = req.body.userName;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    const email = req.body.email;
    try {
      const emailExist = await userModel.findOne({ email });
      if (emailExist !== null)
        return res.send({ status: 200, result: "email already exist" });

      const phoneNoExist = await userModel.findOne({ phoneNo });
      if (phoneNoExist !== null)
        return res.send({ status: 200, result: "phoneNo exist" });

      const saveUserInfo = new userModel({
        userName: userName,
        phoneNo: phoneNo,
        password: password,
        email: email,
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
        res.send({ error, Token: "invalid" });
      }
    } else if (req.body.email) {
      try {
        const response = await userModel.findOne({
          email: req.body.email,
          password: req.body.password,
        });

        if (response) {
          var token = jwt.sign(
            { id: response._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ Token: token });
        } else {
          res.send({ Token: "invalid" });
        }
      } catch (error) {
        res.send({ Error: error, Token: "invalid" });
      }
    }
  };

  static otp = async (req, res) => {
    try {
      const email = req.body.email;
      var otp = Math.floor(1000 + Math.random() * 9000);
      // console.log(otp);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: "chatappofficial70@gmail.com", // generated ethereal user
          pass: "chatapp.123", // generated ethereal password
        },
      });
      // send email
      var mailOptions = {
        from: "chatappofficial70@gmail.com",
        to: email,
        subject: "Reset password",
        html: `Hello <b>${email}<b>,
                   <p>dear <b>user<b/></p>
                   ${otp} is your chatApp OTP, Pleas do not shere OTP as it is confidential.
                <br>Regards,<br>
                <br>chatapp Team<br>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("sendEmail:- " + error);
          res.send({ otp: "send One more" });
        }
        console.log("sendEmail:- Message sent: %s", info.messageId);
        res.send({ otp: md5(otp) });
      });
    } catch (error) {
      req.send(error);
    }
  };

  static verify = async (req, res) => {
    try {
      const user_id = req.user.id;
      const response = await userModel.findById(user_id);
      console.log(response);
      res.json(response);
    } catch (error) {
      console.log("error:", error);
      res.send({ statu: 401, error });
    }
  };

  static newContact = async (req, res) => {
    const contactPhoneNo = req.body.contactPhoneNo;
    const userId = req.user.id;
    const userPhoneNo = req.body.phoneNo;
    const newRoomId = md5(userPhoneNo + "_" + contactPhoneNo);
    const existingRoomId = md5(contactPhoneNo + "_" + userPhoneNo);
    var roomIds = [];
    var roomid;
    try {
      // find contact have account in the chet app
      const contactRegistrationDetail = await userModel.find({
        phoneNo: contactPhoneNo,
      });

      if (contactRegistrationDetail.length == 0)
        return res.json({
          response: "contact not exist",
        });

      if (contactRegistrationDetail[0].phoneNo == userPhoneNo)
        return res.json({
          response: "You can't add yourself",
        });

      // find contact detail using contact phoneNo
      const contactDetail = await contactModel.find({
        phoneNo: contactPhoneNo,
      });

      // find contact detail using user phoneNo (currently logged-In user phone No  )
      const [UserNo_Exist] = await contactModel.find({
        phoneNo: userPhoneNo,
      });

      if (UserNo_Exist && UserNo_Exist.roomId.includes(existingRoomId)) {
        // if user phoneNo [document present in collention "contactschemas"] exist.
        //  If exist, then find the roomid(roomid=existingRoomId)
        roomid = existingRoomId;
        roomIds =
          contactDetail.length != 0
            ? [...contactDetail[0].roomId, existingRoomId]
            : [existingRoomId];
      } else {
        // if the user phoneNo is not present then find
        roomid = newRoomId;
        roomIds =
          contactDetail.length != 0
            ? [...contactDetail[0].roomId, newRoomId]
            : [newRoomId];
        console.log("newRoomId ", newRoomId);
      }

      if (contactDetail.length) {
        if (!contactDetail[0].userIDs.includes(userId)) {
          console.log("update");
          const userIds = contactDetail[0].userIDs;
          userIds.push(userId);
          const response = await contactModel.findByIdAndUpdate(
            contactDetail[0]._id,
            { userIDs: userIds, roomId: roomIds }
          );
          res.json({
            result: response,
            roomID: roomid,
          });
        } else if (contactDetail[0].userIDs.find((e) => e == userId)) {
          res.json({
            response: "already exist",
          });
        }
      } else {
        console.log("enterNew");
        const newContact = new contactModel({
          userIDs: req.user.id,
          name: req.body.contactName,
          phoneNo: req.body.contactPhoneNo,
          roomId: roomIds,
          contactID: contactRegistrationDetail[0]._id,
          profilePic: contactRegistrationDetail[0].profilePic,
          type: "PRIVATE",
        });
        const result = await newContact.save();
        res.json({
          result,
          roomID: roomid,
        });
      }
    } catch (error) {
      res.send({
        status: 200,
        error,
      });
      console.log("error", error);
    }
  };

  static contactList = async (req, res) => {
    try {
      const response = await contactModel.find();
      const userId = req.user.id;

      var contactList = [];
      for (const contact of response) {
        contact.userIDs.find((e) => {
          if (e === userId) contactList.push(contact);
        });
      }
      res.json(contactList);
    } catch (error) {
      res.sendStatus(403);
      console.log(error);
    }
  };

  static updateimage = async (req, res) => {
    const path = req.file.path;
    const userId = req.user.id;
    const ID = req.body.ID ? req.body.ID : null;
    const userPhoneNo = req.body.userPhoneNo;
    try {
      if (ID) {
        const h = await contactModel.findByIdAndUpdate(ID, {
          profilePic: path,
        });
        const updatedUser = await contactModel.findById(ID);
        res.json(updatedUser);
      } else {
        const updateUserPic = await userModel.findByIdAndUpdate(userId, {
          profilePic: path,
        });
        const userInContacts = await contactModel.findOneAndUpdate(
          { phoneNo: userPhoneNo },
          { profilePic: path }
        );
        const updatedUser = await userModel.findById(userId);
        res.json(updatedUser);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  static message = async (req, res) => {
    const senderId = req.user.id;
    const senderPhoneNo = req.body.senderPhoneNo;
    const roomId = req.body.roomId;
    const text = req.body.text;
    const type = req.body.type;
    try {
      const Chatresponse = new chatModel({
        roomId: roomId,
        senderId: senderId,
        senderPhoneNo,
        text: text,
        type,
        created_at: new Date(),
      });
      const result = await Chatresponse.save();
      res.json(result);
    } catch (error) {
      console.log("error", error);
      req.sendStatus(500);
    }
  };

  static newgroup = async (req, res) => {
    const userId = req.user.id;
    const filePath = req.file?.path ? req.file.path : "";
    const groupName = req.body.groupName;
    const roomId = req.body.roomId;
    const userIDs = req.body.userIDs + "," + userId;
    try {
      const newContact = new contactModel({
        userIDs: userIDs.split(","),
        name: groupName,
        roomId: roomId,
        profilePic: filePath,
        type: "GROUP",
      });
      const result = await newContact.save();
      res.json({ result, roomID: roomId });
    } catch (error) {
      res.sendStatus(500);
      console.loc(error);
    }
  };

  static getMessage = async (req, res) => {
    try {
      const roomId = req.params["roomId"];
      const Chatrespons = await chatModel.find({ roomId });
      res.json(Chatrespons);
    } catch (error) {
      res.sendStatus(500);
    }
  };

  static allMembers = async (req, res) => {
    const userIds = req.body.userIDs;
    try {
      const response = await userModel.find({ _id: { $in: userIds } });
      res.json(response);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  static addgroupmember = async (req, res) => {
    const userIDs = req.body.userIds;
    const _id = req.body._id;
    try {
      await contactModel.findByIdAndUpdate(_id, { userIDs });
      const response = await contactModel.findById(_id);
      res.json(response);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  static updatepass = async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    try {
      const response = await userModel.findOneAndUpdate(
        { email },
        { $set: { password } }
      );
      // console.log(response);

      res.send(response);
    } catch (error) {
      res.json(error);
    }
  };

  static leavgroup = async (req, res) => {
    const groupid = req.body.groupid;
    const userIDs = req.body.userIDs;
    try {
      const response = await contactModel.findByIdAndUpdate(groupidk, {
        userIDs,
      });
      res.json(response);
      // console.log(response);
    } catch (error) {
      res.json(500);
      console.log("error", error);
    }
  };
}

module.exports = codeeditorController;
