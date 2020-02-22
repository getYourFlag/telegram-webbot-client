import axios from '../services/axios';

const SUCCESS = 'message.FETCH_SUCCESS';
const FAIL = 'message.FETCH_FAIL';
const UPDATE = 'message.UPDATE';

export const fetchSuccess = (messages, chatId, actionType) => {
    return {type: actionType, payload: messages, chatId: chatId};
}

export const fetchFail = err => {
    return {type: FAIL, payload: err};
}

export const fetchMessages = chatId => {
    return dispatch => {
        axios.get('/messages/' + chatId).then(res => {
            dispatch(fetchSuccess(res.data, chatId, SUCCESS));
        })
        .catch(err => {
            dispatch(fetchFail(err, chatId));
        });
    }
}

export const updateMessages = (chatId, lastUpdate) => {
    return (dispatch, getState) => {
        const data = {
            'time': getState().messageReducer.lastUpdate,
            'chatId': chatId
        }
        return axios.post('/messages/update', data).then(res => {
            dispatch(fetchSuccess(res.data, chatId, UPDATE));
        })
        .catch(err => {
            dispatch(fetchFail(err, chatId));
        });
    }
}