import axios from "../services/axios";
import errors from "../../../config/errorDisplay.json";

const SENDING = "send.SENDING";
const SUCCESS = "message.APPEND";
const FAIL = "message.SEND_FAIL";
const CHAT_UPDATE = "chat.UPDATE_AFTER_SENT";

export const sendingMessages = () => {
    return { type: SENDING, loading: true };
};

export const sendSuccess = message => {
    return { type: SUCCESS, payload: message };
};

export const sendFail = err => {
    err = errors.sendMsg[err] || err;
    return { type: FAIL, payload: err };
};

export const updateChat = message => {
    return { type: CHAT_UPDATE, payload: message };
};

export const sendMessages = data => {
    return dispatch => {
        dispatch(sendingMessages());
        return axios
            .post("/send/message", data)
            .then(res => {
                dispatch(sendSuccess(res.data));
                dispatch(updateChat(res.data));
            })
            .catch(err => {
                let errorMsg = errors.sendMsg[err.error_code] || errors.sendMsg.default;
                dispatch(sendFail(errorMsg));
            });
    };
};

export const sendMedia = (data, type) => {
    return dispatch => {
        dispatch(sendingMessages());
        return axios
            .post(`/send/media/${type}`, data, {
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            })
            .then(res => {
                dispatch(sendSuccess(res.data));
                dispatch(updateChat(res.data));
            })
            .catch(err => {
                dispatch(sendFail(err));
            });
    }
}
