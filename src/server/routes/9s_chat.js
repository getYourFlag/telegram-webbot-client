const express = require("express");
const router = express.Router();
const Chat = require('../models/chat');
const Message = require('../models/message');
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');

router.use(authMiddleware());

router.get('/bot/:botId', (req, res) => {
    Chat.find({bot_id: mongoose.Types.ObjectId(req.params.botId), archived: false})
        .populate('latest_message')
        .sort([['latest_update', -1]])
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/archived/:botId', (req, res) => {
    Chat.find({bot_id: mongoose.Types.ObjectId(req.params.botId), archived: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/updates', (req, res) => {
    let time = req.params.time || Date.now() - 600000;
    time = Math.floor(time / 1000);

    Message.find({ date: { $gte: time }})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    
});

module.exports = router;