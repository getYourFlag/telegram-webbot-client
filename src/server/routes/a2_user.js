require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use("/register", authMiddleware(255));
router.post("/register", async function(req, res) {
    const {username, nick, permission, password} = req.body;
    password = await bcrypt.hash(password, 10);

    const user = await User.create({ username, nick, permission, password });
    res.status(200).send(user);
});

router.post("/login", async function(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res
            .status(401)
            .send({ error: "Username or Password Incorrect." });
    }
    if (!bcrypt.compare(password, user.password)) {
        return res
            .status(401)
            .send({ error: "Username or Password Incorrect." });
    }

    user.last_login = Date.now();
    user.save();

    const token = jwt.sign(
        {
            username,
            nick: user.nick,
            permission: user.permission
        },
        process.env.jwtKey,
        { expiresIn: process.env.TOKEN_VALID_TIME*1000 }
    );

    return res
        .cookie("token", token, {
            expires: new Date(new Date().getTime() + 1000*process.env.TOKEN_REFRESH_TIME),
            secure: false,
            httpOnly: true
        })
        .status(200).send({user_id: user._id, nick: user.nick});
});

router.use('/test', authMiddleware());
router.get('/test', function(req, res) {
    return res.status(200).send({
        nick: req.user.nick,
        message: "Successful access to protected route!"
    });
})

module.exports = router;