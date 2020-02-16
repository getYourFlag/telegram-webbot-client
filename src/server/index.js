const app = require("./services/express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://127.0.0.1/tgwebbot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error."));

app.listen(PORT);
