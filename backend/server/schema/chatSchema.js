const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ChatSchema = new Schema({
  roomId: { type: String, require: true },
  senderId: { type: String, require: true },
  text: { type: String, require: true },
  created_at: { type: Date, require: true },
});

const chatModel = mongoose.model("chatModel", ChatSchema);
module.exports = chatModel;
