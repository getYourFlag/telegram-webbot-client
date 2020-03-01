const router = require("express").Router();
const upload = require('multer')();
const fs = require("fs");
const Path = require("path");
const uuid = require("uuid");
const telegramSettings = require("../../../config/telegram.json");

const Chat = require("../models/chat");
const Bot = require("../models/bot");
const Message = require("../models/message");
const telegram = require("../services/telegram");

async function updateDbForNewMsg(message) {
    const result = message.result;
    const date = result.date * 1000;
    const text = result.text;
    let chat = await Chat.findOne({ tg_id: result.chat.id });
    const newMessage = await Message.create({
        message_id: result.message_id,
        ref_chat_id: chat._id,
        text: text,
        date: date,
        media_link: result.media_link || null,
        media_type: result.media_type || null,
        fromUs: true,
        success: true,
    });
    await Chat.updateOne(
        { _id: chat._id },
        { $set: { latest_message: newMessage._id, latest_update: date } }
    );
    return newMessage;
}

async function getBotAndChat(chatId, botId) {
    const targetBot = Bot.findById(botId);
    const targetChat = Chat.findById(chatId);
    return Promise.all([targetBot, targetChat]).then(values => {
        const [bot, chat] = values;
        if (!bot) {
            return { error: "Bot not found", code: 1 }
        }
        if (!chat) {
            return { error: "Chat not found", code: 2 }
        }
        return { tg_id: chat.tg_id, token: bot.token }
    })
}

router.post("/message", async (req, res) => {
    const { text, bot_id, chat_id } = req.body;
    getBotAndChat(chat_id, bot_id).then(tgInfo => {
        if (tgInfo.error) return res.status(500).send(tgInfo.error).end();
        return telegram.sendMessage(tgInfo.token, {
            chat_id: tgInfo.tg_id,
            text
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
        console.error(error.response.data);
        return res
            .status(500)
            .send(error.response.datar)
            .end();
    });
});

router.post("/media/:type", upload.single('file'), async (req, res) => {
    const mediaType = req.params.type;
    const typeInfo = telegramSettings.references[mediaType];
    if (!typeInfo) return res.status(500).send({error: "Unknown media type", error: 3 });
    const { callFn, attribute } = typeInfo;

    const { caption, bot_id, chat_id } = req.body;
    const tgInfo = await getBotAndChat(chat_id, bot_id);
    if (tgInfo.error) return res.status(500).send(tgInfo.error);

    const mediaName = uuid.v4() + "." + req.file.mimetype.split('/')[1];
    const mediaPath = Path.resolve(__dirname, "../../../", "assets", mediaName);
    await fs.promises.writeFile(mediaPath, req.file.buffer);

    const msgData = {
        chat_id: tgInfo.tg_id,
        caption: caption,
        fileName: mediaName
    }
    msgData[attribute] = fs.createReadStream(mediaPath);

    try {
        var telegramRes = await telegram[callFn](tgInfo.token, msgData);
    } catch (error) {
        return fs.promises.unlink(mediaPath).then(_ => res.status(500).send(error.response.data).end());
    }

    const telegramData = telegramRes.data;
    telegramData.result.text = telegramData.result.caption;
    telegramData.result.media_link = `/assets/${mediaName}`;
    telegramData.result.media_type = mediaType;
    const newMessage = await updateDbForNewMsg(telegramData);
    return res.status(200).send(newMessage).end();

});

module.exports = router;
