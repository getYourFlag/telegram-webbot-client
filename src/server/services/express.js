const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouter = require("../routes/a2_user");
const webhook = require("../routes/9s_webhook");
const chatRouter = require("../routes/9s_chat");
const chatManageRouter = require("../routes/a2_chat");
const botRouter = require("../routes/a2_bot");
const sendRouter = require("../routes/2b_send");

app.use(cors({
    origin: config.get('cors_path'),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.use("/user", userRouter);
app.use("/receive", webhook);
app.use("/chats", chatRouter);
app.use("/chatmgmt", chatManageRouter);
app.use("/bot", botRouter);
app.use("/send", sendRouter);

module.exports = app;
