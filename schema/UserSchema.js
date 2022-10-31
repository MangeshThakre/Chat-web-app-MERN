const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = new Schema({
  email: { type: String, require: true },
  userName: { type: String },
  phoneNo: { type: Number },
  profilePic: { type: String },
  password: { type: String, require: true },
});

const userModel = mongoose.model("userSchema", userSchema);
module.exports = userModel;
