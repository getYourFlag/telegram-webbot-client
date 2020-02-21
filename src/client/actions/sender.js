import axios from '../services/axios';

const SENDING = 'send.SENDING';
const SUCCESS = 'message.APPEND';
const FAIL = 'message.FAIL';

export const sendingMessages = () => {
    return {type: SENDING, loading: true};
}

export const sendSuccess = message => {
    return {type: SUCCESS, payload: message};
}

export const sendFail = err => {
    return {type: FAIL, payload: err};
}

export const sendMessages = data => {
    return dispatch => {
        dispatch(sendingMessages());
        return axios.post('/send/message', data).then(res => {
            dispatch(sendSuccess(res.data));
        })
        .catch(err => {
            dispatch(sendFail(err));
        });
    }
}