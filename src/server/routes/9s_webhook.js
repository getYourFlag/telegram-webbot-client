const config = require("config");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();

const Message = require("../models/message");
const Chat = require("../models/chat");
const Packer = require("../services/packer");
const { mediaTypes } = require("../../../config/telegram");

router.post("/:botId", async (req, res) => {
    if (config.get('development.logRequests')) {
        let logFilePath = path.resolve(__dirname, '../../../logs/requests.json');
        let requestJson = [];
        fs.readFile(logFilePath, (err, file) => {
            if (err) {
                console.log("Creating Log File for requests logging ......");
            } else {
                try {
                    requestJson = JSON.parse(file);
                } catch (e) {}
            }
            requestJson.push(req.body);
            fs.writeFile(logFilePath, JSON.stringify(requestJson, null, 4), (err, res) => {});
        })
    }

    let { messageData, chatData } = Packer.pack(req);
    let chat = await Chat.findOneAndUpdate(
        { tg_id: chatData.tg_id },
        chatData,
        {
            new: true,
            upsert: true,
        }
    );
    messageData = { ...messageData, ref_chat_id: chat._id };

    for (let type of mediaTypes) {
        if (req.body.message[type]) {
            messageData = await Packer.media(
                req.params.botId,
                messageData,
                req.body.message[type],
                type
            );
        }
    }

    let newMessage = await Message.create(messageData);
    await Chat.updateOne(
        { _id: chat._id },
        {
            $set: {
                latest_message: newMessage._id,
                latest_update: newMessage.date,
            },
        }
    );
    res.status(200)
        .send(newMessage)
        .end();
});

module.exports = router;
