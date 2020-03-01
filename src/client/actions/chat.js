import axios from "../services/axios";

const SUCCESS = "chat.FETCH_SUCCESS";
const FAIL = "chat.FETCH_FAIL";
const DELETE = "chat.DELETE";
const ARCHIVE = "chat.ARCHIVE";
const UPDATE = "chat.UPDATE";

export const fetchSuccess = (chats, bot) => {
    return { type: SUCCESS, payload: { chats, bot } };
};

export const fetchFail = err => {
    return { type: FAIL, payload: err };
};

export const chatDeleted = data => {
    return { type: DELETE, payload: data };
};

export const archiveChat = data => {
    return { type: ARCHIVE, payload: data };
};

export const chatUpdated = data => {
    return { type: UPDATE, payload: data };
};

export const fetchChats = bot => {
    return dispatch => {
        return axios
            .get("/chats/bot/" + bot._id)
            .then(res => {
                dispatch(fetchSuccess(res.data, bot));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(sendFail(err.response.data));
                } else {
                    dispatch(sendFail(err));
                }
            });
    };
};

export const deleteChat = chatId => {
    return dispatch => {
        dispatch(fetchingChat());
        return axios
            .delete("/chats/delete/" + chatId)
            .then(res => {
                dispatch(fetchSuccess(res.data));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(sendFail(err.response.data));
                } else {
                    dispatch(sendFail(err));
                }
            });
    };
};

export const updateChat = bot_id => {
    return (dispatch, getState) => {
        const time = getState().chatReducer.lastUpdate;
        return axios
            .get("/chats/update", { params: { time, bot_id } })
            .then(res => {
                dispatch(chatUpdated(res.data));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(sendFail(err.response.data));
                } else {
                    dispatch(sendFail(err));
                }
            });
    };
};
