const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routers = require("../routes");

app.use(
    cors({
        origin: [config.get("frontend_url")],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.use("/users", routers.user);
app.use("/receive", routers.webhook);
app.use("/chats", routers.getChat);
app.use("/chatmgmt", routers.manageChat);
app.use("/bots", routers.manageBot);
app.use("/messages", routers.getMessage);
app.use("/send", routers.sendMessage);
app.use("/assets", routers.getAsset);

module.exports = app;
