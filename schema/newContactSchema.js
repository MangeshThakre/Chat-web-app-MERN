const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ContactSchema = new Schema({
  type: { type: String, require: true },
  userIDs: { type: Array, require: true },
  roomId: { type: Array, require: true },
  name: { type: String, require: true },
  contactID: { type: String },
  profilePic: { type: String },
  phoneNo: { type: Number },
});

const contactModel = mongoose.model("contactSchema", ContactSchema);
module.exports = contactModel;
