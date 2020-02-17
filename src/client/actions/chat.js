import axios from '../services/axios';
import config from 'config';

const FETCHING = 'chats.FETCHING';
const SUCCESS = 'chats.FETCH_SUCCESS';
const FAIL = 'chats.FETCH_FAIL';
const SETTINGS = 'chats.SETTINGS';
const DELETE = 'chats.DELETE';
const ARCHIVE = 'chats.ARCHIVE';

export const fetchingChat = () => {
    return {type: FETCHING, loading: true};
}

export const fetchSuccess = data => {
    return {type: SUCCESS, payload: data};
}

export const fetchFail = err => {
    return {type: FAIL, payload: err};
}

export const fetchSettings = () => {
    const settingList = config.get('settings.items');
    return {type: SETTINGS, payload: settingList};
}

export const deleteChat = data => {
    return {type: DELETE, payload: data}
}

export const archiveChat = data => {
    return {type: ARCHIVE, payload: data}
}

export const fetchChats = botId => {
    return dispatch => {
        dispatch(fetchingChat());
        return axios.get('/chats/bot/' + botId).then(res => {
            dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchFail(err));
        })
    }
}

export const deleteChat = chatId => {
    return dispatch => {
        dispatch(fetchingChat());
        return axios.delete('/chats/delete/' + chatId).then(res => {
            dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchFail(err));
        })
    }
}