import axios from '../services/axios';

const FETCHING = 'chat.FETCHING';
const SUCCESS = 'chat.FETCH_SUCCESS';
const FAIL = 'chat.FETCH_FAIL';
const DELETE = 'chat.DELETE';
const ARCHIVE = 'chat.ARCHIVE';

export const fetchingChat = () => {
    return {type: FETCHING, loading: true};
}

export const fetchSuccess = (chats, bot) => {
    return {type: SUCCESS, payload: {chats, bot}};
}

export const fetchFail = err => {
    return {type: FAIL, payload: err};
}

export const chatDeleted = data => {
    return {type: DELETE, payload: data}
}

export const archiveChat = data => {
    return {type: ARCHIVE, payload: data}
}

export const fetchChats = bot => {
    return dispatch => {
        dispatch(fetchingChat());
        return axios.get('/chats/bot/' + bot._id).then(res => {
            dispatch(fetchSuccess(res.data, bot));
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