const express = require("express");
const router = express.Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const Bot = require('../models/bot');

router.post('/:token', async (req, res) => {
    const token = req.params.token;
    const bot = await Bot.findOne({token: token});
    if (!bot) {
        // Cease future mesages.
        // TODO: Add Error Logging.
        return res.status(200).end();
    }
    
    const update_id = req.body.update_id;
    const { message } = req.body;
    const { date, text } = message;

    const chat_id = message.chat.id;
    const message_id = message.message_id;
    let title, username, user_id, user_type;

    if (message.from) { // Messages from accounts & groups.
        title = message.from.first_name + ' ' + message.from.last_name;
        username = message.from.username;
        user_id = message.from.id;
        user_type = message.chat.type;
    } else { // Message from channels.
        title = message.chat.title;
        username = message.chat.username;
        user_id = message.chat.invite_link.replace('https://t.me/', '');
        user_type = 'channel';
    }

    title = title.trim();
    fromUs = false;

    let chat = await Chat.findOne({tg_id: chat_id});
    if (!chat) {
        chat = await Chat.create({
            tg_id: chat_id,
            type: user_type,
            user_id, 
            username,
            title,
            bot_id: bot._id,
        });
    }

    let msg = await Message.create({
        update_id, message_id,
        ref_chat_id: chat._id,
        date, text, fromUs,
        success: true
    });
    chat.latest_message = msg._id;
    chat.date = date;

    res.on('finish', _ => chat.save());
    res.status(200).send(msg).end();
});


module.exports = router;