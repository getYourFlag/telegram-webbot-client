const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const botSchema = new Schema({
  token: { type: String, required: true },
  name: String,
  description: String
});

module.exports = mongoose.model("Bot", botSchema);
