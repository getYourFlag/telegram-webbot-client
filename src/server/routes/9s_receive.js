const express = require("express");
const router = express.Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const Bot = require('../models/bot');

router.post('/:token', async (req, res) => {
    const token = req.params.token;
    const bot = await Bot.find({token: token});
    if (!bot) {
        // Cease future mesages.
        // TODO: Add Error Logging.
        return res.status(200).end();
    }

    const { message_id, date, text } = req.params;
    const { chat_id, chat_title } = req.params.chat;
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

    const chat = await Chat.find({tg_id: chat_id});
    if (!chat) {
        chat = await Chat.create({
            tg_id: chat_id,
            type: user_type,
            user_id, 
            shown_name,
            username,
            bot_id: bot._id,
            title: chat_title
        });
    }

    const message = await Message.create({
        message_id, 
        chat_id: chat._id,
        date, text, fromUs,
    });

    return res.status(200).send(message);
});


module.exports = router;