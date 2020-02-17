const config = require('config');
const express = require("express");
const router = express.Router();
const Message = require('../models/message');
const axios = require('axios');

router.post('/:token', async (req, res) => {
    const { message_id, date, text } = req.params;
    const { chat_id, chat_title, type } = req.params.chat;
    let shown_name, username, user_id, user_type;

    if (req.params.from) { // Messages from accounts & groups.
        shown_name = req.params.from.first_name + ' ' + req.params.from.last_name;
        username = req.params.from.user_id;
        user_id = req.params.from.user_id;
        user_type = 'user';
    } else { // Message from channels.
        shown_name = chat_title;
        username = req.params.chat.username;
        user_id = req.params.chat.invite_link.replace('https://t.me/', '');
        user_type = 'channel';
    }

    shown_name = shown_name.trim();
    fromUs = false;

    await Message.create({
        message_id, chat_id, type, date, text, fromUs,
        user: {
            user_id, shown_name, username,
            type: user_type
        }
    });

    return res.status(200).end();
});


module.exports = router;