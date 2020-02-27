const { systemMsg } = require("../../../config/telegram.json");
const Bot = require("../models/bot");
const { downloadFile } = require("../services/telegram");

const fromPrivate = message => {
  const info = {
    type: "private",
    tg_id: message.chat.id,
    user_id: message.from.id,
    username: message.from.username,
    title: (message.from.first_name + " " + message.from.last_name).trim()
  };

  return info;
};

const fromChannel = message => {
  const info = {
    type: "channel",
    tg_id: message.chat.id,
    user_id: message.chat.id,
    username: message.chat.title,
    title: message.chat.title.trim(),
    isSystemMessage: false,
    text: message.text
  };

  if (!message.text) {
    // Identify system message and replace the keywords in the predefined sentences.
    for (key of Object.keys(systemMsg)) {
      if (message[key]) {
        info.text = systemMsg[key].replace("$", message[key]);
        info.isSystemMessage = true;
        break;
      }
    }
  }

  return info;
};

const pack = request => {
  const type = request.body.message ? "private" : "channel";
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
    isSystemMessage: false
  };

  if (message.from) {
    var chatData = { ...fromPrivate(message), bot_id, type };
  } else {
    var chatData = fromChannel(message);
    messageData.isSystemMessage = chatData.isSystemMessage;
    messageData.text = chatData.text;
    delete chatData.isSystemMessage;
    delete chatData.text;
    chatData = { ...chatData, bot_id, type };
  }

  // Use caption as text if existed and text is undefined.
  if (!messageData.text && message.caption) messageData.text = message.caption;

  return { messageData, chatData };
};

const media = async (botId, messageData, media, mediaType) => {
  const bot = await Bot.findById(botId);
  if (mediaType === "photo") media = media[media.length - 1];
  if (!messageData.text) delete messageData.text;

  let fileExtension = media.mime_type ? media.mime_type.split("/")[1] : "jpg";
  messageData.media_link = await downloadFile(
    bot.token,
    media.file_id,
    media.file_unique_id + "." + fileExtension
  );
  messageData.media_type = mediaType;

  return messageData;
};

module.exports = {
  pack,
  media
};
