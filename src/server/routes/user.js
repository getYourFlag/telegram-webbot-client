require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.post("/register", authMiddleware(255), async function(req, res) {
    const { username, nick, permission, password } = req.body;
    password = await bcrypt.hash(password, 10);

    const user = await User.create({ username, nick, permission, password });
    res.status(200).send(user);
});

router.post("/login", async function(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
        return res
            .status(401)
            .send({ error: 1 })
            .end();
    }

    // Throttling bad requests.
    const MAX_ATTEMPTS = process.env.LOGIN_MAX_ATTEMPTS;
    const COOLDOWN = process.env.LOGIN_COOLDOWN * 1000;
    const currentTime = Date.now();

    if (
        user.failed_attempts > MAX_ATTEMPTS &&
        user.last_login > currentTime - COOLDOWN
    ) {
        return res
            .status(401)
            .send({ code: 2 })
            .end();
    }
    user.last_login = currentTime;

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        user.failed_attempts += 1;
        let errorCode = 1;
        if (user.failed_attempts > MAX_ATTEMPTS) {
            errorCode = 2;
        }

        await user.save();
        return res
            .status(401)
            .send({ code: errorCode })
            .end();
    }

    user.save();

    const token = jwt.sign(
        {
            id: user._id,
            username,
            nick: user.nick,
            permission: user.permission,
        },
        process.env.jwtKey,
        { expiresIn: process.env.TOKEN_VALID_TIME * 1000 }
    );

    return res
        .cookie("token", token, {
            expires: new Date(
                new Date().getTime() + 1000 * process.env.TOKEN_REFRESH_TIME
            ),
            secure: false,
            httpOnly: true,
        })
        .status(200)
        .send({ user_id: user._id, nick: user.nick });
});

router.get("/me", authMiddleware(), function(req, res) {
    User.findOne({ nick: req.user.nick }).then(user =>
        res
            .status(200)
            .send(user)
            .end()
    );
});

router.patch("/patch", authMiddleware(), function(req, res) {
    User.findByIdAndUpdate(req.user.id, req.body).then(user => {
        res.status(200).send(user).end();
    });
});

router.patch("/patch/:id", authMiddleware(255), function(req, res) {
    User.findByIdAndUpdate(req.user.id, req.body).then(user => {
        res.status(200).send(user).end();
    });
});

module.exports = router;
