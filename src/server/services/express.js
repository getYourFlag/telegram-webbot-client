const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/a2_user");
const webhook = require("../routes/9s_webhook");
const chatRouter = require("../routes/9s_chat");
const chatManageRouter = require("../routes/a2_chat");
const botRouter = require("../routes/a2_bot");
const messageRouter = require("../routes/9s_message");
const sendMsgRouter = require("../routes/2b_message");
const assetRouter = require("../routes/9s_asset");

app.use(
  cors({
    origin: config.get("cors_path"),
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});
app.use("/users", userRouter);
app.use("/receive", webhook);
app.use("/chats", chatRouter);
app.use("/chatmgmt", chatManageRouter);
app.use("/bots", botRouter);
app.use("/messages", messageRouter);
app.use("/send", sendMsgRouter);
app.use("/assets", assetRouter);

module.exports = app;
