import {updateMessages} from '../actions/message';
import {updateChat} from '../actions/chat';
import store from '../index';
import config from '../../../config/dev.json';

let updateFnId = null;
let updateStatus = null;
let updateChatId = null;
let updateBotId = null;

let updateInterval = config.updates.updateInterval;

export const setChatUpdate = botId => {
    clearInterval(updateFnId);
    updateBotId = botId;
    updateFnId = setInterval(_ => {
        store.dispatch(updateChat(updateBotId));
    }, updateInterval);
    updateStatus = 'chat';
}

export const removeChatUpdate = _ => {
    clearInterval(updateFnId);
    updateStatus = null;
    botId = null;
}

export const setMessageUpdate = chatId => {
    if (updateStatus === null || chatId === null) return null;
    updateChatId = chatId;
    clearInterval(updateFnId);
    updateFnId = setInterval(_ => {
        store.dispatch(updateChat(updateBotId));
        store.dispatch(updateMessages(updateChatId));
    }, updateInterval);
    updateStatus = 'message';
}

export const removeMessageUpdate = _ => {
    updateChatId = null;
    clearInterval(updateFnId);
    updateFnId = setInterval(_ => {
        store.dispatch(updateChat(botId));
    });
    updateStatus = 'chat';
}