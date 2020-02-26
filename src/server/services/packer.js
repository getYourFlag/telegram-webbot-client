const telegramSpecials = require('../../../config/tgmgmt.json');
const Bot = require('../models/bot');
const { downloadFile } = require('../services/telegram');

const fromPrivate = message => {
    const info = {
        type: 'private',
        tg_id: message.chat.id,
        user_id: message.from.id,
        username: message.from.username,
        title: (message.from.first_name + ' ' + message.from.last_name).trim(),
    }

    return info;
}

const fromChannel = message => {
    const info = {
        type: 'channel',
        tg_id: message.chat.id,
        user_id: message.chat.id,
        username: message.chat.title,
        title: message.chat.title.trim(),
        isSystemMessage: false,
        text: message.text
    }

    if (!message.text) {
        for (key of Object.keys(telegramSpecials)) {
            if (message[key]) {
                info.text = telegramSpecials[key].replace('$', message[key]);
                info.isSystemMessage = true;
                break;
            }
        }
    }

    return info;
}

const pack = request => {
    const type = request.body.message ? 'private': 'channel';
    const message = request.body.message || request.body.channel_post;
    const update_id = request.body.update_id;
    const bot_id = request.params.botId;

    let date = message.date * 1000;
    const messageData = {
        update_id: update_id,
        message_id: message.message_id,
        text: message.text,
        date: date,
        fromUs: false,
        success: true,
        isSystemMessage: false,
    }

    if (message.from) {
        var chatData = {...fromPrivate(message), bot_id, type}
    } else {
        var chatData = fromChannel(message);
        messageData.isSystemMessage = chatData.isSystemMessage;
        messageData.text = chatData.text;
        delete chatData.isSystemMessage;
        delete chatData.text;
        chatData = {...chatData, bot_id, type}
    }

    return {messageData, chatData}
}

const photo = async (botId, messageData, photoData) => {
    const bot = await Bot.findById(botId);

    const photo = photoData[photoData.length-1];
    if (!messageData.text) delete messageData.text;
    messageData.media_link = await downloadFile(bot.token, photo.file_id, photo.file_unique_id + '.jpg');

    return messageData;
}

module.exports = {
    pack, photo
};