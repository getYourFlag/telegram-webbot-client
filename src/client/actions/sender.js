import axios from '../services/axios';

const SENDING = 'send.SENDING';
const SUCCESS = 'message.APPEND';
const FAIL = 'message.FAIL';
const CHAT_UPDATE = 'chat.UPDATE_AFTER_SENT';

export const sendingMessages = () => {
    return {type: SENDING, loading: true};
}

export const sendSuccess = message => {
    return {type: SUCCESS, payload: message};
}

export const sendFail = err => {
    return {type: FAIL, payload: err};
}

export const updateChat = message => {
    return {type: CHAT_UPDATE, payload: message}
}

export const sendMessages = data => {
    return dispatch => {
        dispatch(sendingMessages());
        return axios.post('/send/message', data).then(res => {
            dispatch(sendSuccess(res.data));
            dispatch(updateChat(res.data));
        })
        .catch(err => {
            dispatch(sendFail(err));
        });
    }
}