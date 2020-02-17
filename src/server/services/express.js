const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const webhook = require("../routes/webhook");
const userRouter = require("../routes/a2_user");

app.use(cors({
    origin: [
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.use("/webhook", webhook);
app.use("/user", userRouter);

module.exports = app;
