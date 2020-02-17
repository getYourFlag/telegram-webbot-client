require("dotenv").config();
const app = require("./services/express");
const db = require('./services/mongoose');
const PORT = process.env.PORT || 8080;

app.listen(PORT);