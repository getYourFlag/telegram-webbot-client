const express = require("express");
const router = express.Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const Bot = require('../models/bot');
const telegramSpecials = require('../../../config/tgmgmt.json');

router.post('/:token', async (req, res) => {
    const token = req.params.token;
    const bot = await Bot.findOne({token: token});
    if (!bot) {
        // Cease future mesages.
        // TODO: Add Error Logging.
        return res.status(200).end();
    }
    
    let message = req.body.message || req.body.channel_post;

    const date = message.date * 1000;
    const chat_id = message.chat.id;
    const text = message.text;

    let chat = await Chat.findOne({tg_id: chat_id});
    if (!chat) {
        chat = await Chat.create({
            tg_id: chat_id,
            type: message.from ? 'private' : 'channel',
            user_id: message.from ? message.from.id : chat_id, 
            username: message.from ? message.from.username : message.chat.title,
            title: message.from ?  (message.from.first_name + ' ' + message.from.last_name).trim() : message.chat.title.trim(),
            bot_id: bot._id,
        });
    }

    if (!text) {
        for (key in Object.keys(telegramSpecials)) {
            if (message[key]) {
                text = telegramSpecials[key].replace('$', message[key]);
                break;
            }
        }
    }

    let msg = await Message.create({
        update_id: req.body.update_id, 
        message_id: message.message_id,
        ref_chat_id: chat._id,
        date: message.date,
        text: text,
        fromUs: false,
        success: true
    });
    chat.latest_message = msg._id;
    chat.date = date;

    res.on('finish', _ => chat.save());
    res.status(200).send(msg).end();
});


module.exports = router;