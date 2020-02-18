const config = require('config');
const express = require("express");
const router = express.Router();
const axios = require('axios');
const Chat = require('../models/chat');
const Message = require('../models/message')
const telegram = require( '../services/telegram');

function updateDbForNewMsg(message) {
    return function() {
        Message.create({
            message_id: message.message_id,
            ref_chat_id: message.ref_chat_id,
            text: message.text,
            date: message.date,
            fromUs: true,
            success: true
        }).then(newMessage => {
            Chat.findByIdAndUpdate(ref_chat_id, {latest_message: newMessage.data._id, latest_update: message.date});
        });
    }
}

router.post('/message', async (req, res) => {
    const { text, ref_chat_id, bot_token } = req.body;
    const chat_id = req.body.tg_id;
    let result = await telegram.sendMessage(bot_token, { chat_id, text });

    res.on('finish', updateDbForNewMsg(result.data));
    res.status(200).send(resultData).end();
});

module.exports = router;