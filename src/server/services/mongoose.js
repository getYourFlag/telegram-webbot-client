const mongoose = require("mongoose");
const config = require('config');

const dbUrl = `mongodb://${config.get("mongodb.url")}:${config.get("mongodb.port")}/${config.get("mongodb.db_name")}`;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", function(err) {
    console.error("Connection error: ", err);
});

module.exports = db;