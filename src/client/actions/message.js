import axios from '../services/axios';

const SUCCESS = 'message.FETCH_SUCCESS';
const FAIL = 'message.FETCH_FAIL';

export const fetchSuccess = (messages, chatId) => {
    return {type: SUCCESS, payload: messages, chatId: chatId};
}

export const fetchFail = err => {
    return {type: FAIL, payload: err, chatId: chatId};
}

export const fetchMessages = chatId => {
    return dispatch => {
        axios.get('/messages/' + chatId).then(res => {
            dispatch(fetchSuccess(res.data, chatId));
        })
        .catch(err => {
            dispatch(fetchFail(err, chatId));
        });
    }
}