const router = require('express').Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const Bot = require('../models/bot');
const telegramSpecials = require('../../../config/tgmgmt.json');

router.post('/:botId', async (req, res) => {
    const botId = req.params.botId;
    let message = req.body.message || req.body.channel_post;

    const date = message.date * 1000;
    const chat_id = message.chat.id;
    let text = message.text;
    let isSystemMessage = false;

    const chatUpdate = {
        tg_id: chat_id,
        type: message.from ? 'private' : 'channel',
        user_id: message.from ? message.from.id : chat_id, 
        username: message.from ? message.from.username : message.chat.title,
        title: message.from ?  (message.from.first_name + ' ' + message.from.last_name).trim() : message.chat.title.trim(),
        bot_id: botId,
    }
    let chat = await Chat.findOneAndUpdate({tg_id: chat_id}, chatUpdate, {new: true, upsert: true});

    if (!text) {
        for (key of Object.keys(telegramSpecials)) {
            console.log(key);
            if (message[key]) {
                text = telegramSpecials[key].replace('$', message[key]);
                isSystemMessage = true;
                break;
            }
        }
    }

    let newMessage = await Message.create({
        update_id: req.body.update_id, 
        message_id: message.message_id,
        ref_chat_id: chat._id,
        date: date,
        text: text,
        fromUs: false,
        success: true,
        isSystemMessage
    });
    await Chat.updateOne({_id: chat._id}, {$set: {latest_message: newMessage._id, latest_update: date}});
    res.status(200).send(newMessage).end();
});


module.exports = router;