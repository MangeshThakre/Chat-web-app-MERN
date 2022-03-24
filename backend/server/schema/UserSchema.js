const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = new Schema({
  // emailID: { type: String, require: true },
  // password: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNo: { type: Number },
  password: { type: String, require: true },
});

const userModel = mongoose.model("userSchema", userSchema);
module.exports = userModel;
