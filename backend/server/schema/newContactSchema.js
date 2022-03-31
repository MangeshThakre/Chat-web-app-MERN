const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ContactSchema = new Schema({
  userIDs: { type: Array, require: true },
  roomId: { type: Array, require: true },
  name: { type: String, require: true },
  profilePic: { type: String },
  phoneNo: { type: Number },
});

const contactModel = mongoose.model("contactSchema", ContactSchema);
module.exports = contactModel;
