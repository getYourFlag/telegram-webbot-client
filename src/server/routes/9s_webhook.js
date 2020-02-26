const router = require('express').Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const Packer = require('../services/packer');
const specialAttr = {
    // Attr name => called packer function.
    photo: 'photo'
}

router.post('/:botId', async (req, res) => {
    let {messageData, chatData} = Packer.pack(req);
    let chat = await Chat.findOneAndUpdate({tg_id: chatData.tg_id}, chatData, {new: true, upsert: true});
    messageData = {...messageData, ref_chat_id: chat._id}

    for (let fn of Object.keys(specialAttr)) {
        if (req.body.message[fn]) {
            messageData = await Packer[specialAttr[fn]](req.params.botId, messageData, req.body.message[fn]);
        }
    }

    let newMessage = await Message.create(messageData);
    await Chat.updateOne({_id: chat._id}, {$set: {latest_message: newMessage._id, latest_update: newMessage.date}});
    res.status(200).send(newMessage).end();
});


module.exports = router;