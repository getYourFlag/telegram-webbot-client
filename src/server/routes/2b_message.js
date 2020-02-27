const router = require("express").Router();
const Chat = require("../models/chat");
const Bot = require("../models/bot");
const Message = require("../models/message");
const telegram = require("../services/telegram");

async function updateDbForNewMsg(message) {
    const result = message.result;
    const date = result.date * 1000;
    let chat = await Chat.findOne({ tg_id: result.chat.id });
    const newMessage = await Message.create({
        message_id: result.message_id,
        ref_chat_id: chat._id,
        text: result.text,
        date: date,
        fromUs: true,
        success: true,
    });
    await Chat.updateOne(
        { _id: chat._id },
        { $set: { latest_message: newMessage._id, latest_update: date } }
    );
    return newMessage;
}

router.post("/message", async (req, res) => {
    const { text, bot_id, chat_id } = req.body;
    const currentBot = Bot.findById(bot_id);
    const currentChat = Chat.findById(chat_id);
    Promise.all([currentBot, currentChat])
        .then(values => {
            const [bot, chat] = values;
            if (!bot)
                return res
                    .status(404)
                    .send({ error: "Bot not found", code: 1 })
                    .end();
            if (!chat)
                return res
                    .status(404)
                    .send({ error: "Chat not found", code: 2 })
                    .end();
            return telegram.sendMessage(bot.token, {
                chat_id: chat.tg_id,
                text,
            });
        })
        .then(tgRes => {
            return updateDbForNewMsg(tgRes.data);
        })
        .then(msg =>
            res
                .status(200)
                .send(msg)
                .end()
        )
        .catch(error => {
            console.error(error);
            return res
                .status(500)
                .send(error)
                .end();
        });
});

module.exports = router;
