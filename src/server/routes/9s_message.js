const router = require("express").Router();
const Message = require('../models/message');
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');

router.use(authMiddleware());

router.get('/:chatId', (req, res) => {
    Message.find({ref_chat_id: mongoose.Types.ObjectId(req.params.chatId)})
        .sort([['latest_update', -1]])
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.post('/update', (req, res) => {
    let {time, chatId} = req.body;
    Message.find({ date: { $gte: time }, ref_chat_id: chatId, fromUs: false})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;