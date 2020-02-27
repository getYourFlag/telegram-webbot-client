const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  tg_id: { type: Number, required: true },
  type: { type: String, default: "private" },
  user_id: { type: Number },
  username: String,
  title: { type: String, required: true },
  bot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bot" },
  latest_message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  latest_update: { type: Number, default: Date.now() },
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.model("Chat", chatSchema);
