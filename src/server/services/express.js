const express = require("express");
const app = express();
const cors = require("cors");
const webhook = require("../routes/webhook");
const userRouter = require("../routes/a2_user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.use("/webhook", webhook);
app.use("/user", userRouter);

module.exports = app;
