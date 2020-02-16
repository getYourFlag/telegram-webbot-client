const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async function(req, res) {
    const username = req.body.username;
    const nick = req.body.nick;
    const permission = req.body.permission;
    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({username, nick, permission, password});
    res.status(200).send(user);
});

router.post("/login", async function(req, res) {
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res
            .status(401)
            .send({ error: "Username or Password Incorrect." });
    }
    if (!bcrypt.compare(req.body.password, user.password)) {
        return res
            .status(401)
            .send({ error: "Username or Password Incorrect." });
    }

    user.last_login = Date.now();
    user.save();

    const token = jwt.sign(
        {
            username,
            permission: user.permission
        },
        "testdummykey",
        { expiresIn: 3600 * 24 }
    );

    return res.status(200).send({token});
});

module.exports = router;