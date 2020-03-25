const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema({
    backend_url: String,
    db_url: String,
    db_name: String
});

module.exports = mongoose.model("Setting", settingSchema);
