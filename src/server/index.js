require("dotenv").config();
const config = require("config");
const app = require("./services/express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const dbUrl =
    "mongodb://" +
    config.get("mongodb.url") +
    ":" +
    config.get("mongodb.port") +
    "/" +
    config.get("mongodb.db_name");

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error."));

app.listen(PORT);
