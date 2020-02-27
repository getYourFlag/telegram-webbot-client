import axios from "../services/axios";

const SUCCESS = "message.FETCH_SUCCESS";
const FAIL = "message.FETCH_FAIL";
const UPDATE = "message.UPDATE";
const UNLOAD = "message.UNLOAD";

export const fetchSuccess = (messages, chat, actionType) => {
  return { type: actionType, payload: messages, chat: chat };
};

export const fetchFail = err => {
  return { type: FAIL, payload: err };
};

export const unloadMessages = _ => {
  return { type: UNLOAD };
};

export const fetchMessages = chat => {
  return dispatch => {
    axios
      .get("/messages/" + chat._id)
      .then(res => {
        dispatch(fetchSuccess(res.data, chat, SUCCESS));
      })
      .catch(err => {
        dispatch(fetchFail(err, chat));
      });
  };
};

export const updateMessages = chatId => {
  return (dispatch, getState) => {
    const data = {
      time: getState().messageReducer.lastUpdate,
      chatId: chatId
    };
    return axios
      .post("/messages/update", data)
      .then(res => {
        dispatch(fetchSuccess(res.data, chatId, UPDATE));
      })
      .catch(err => {
        dispatch(fetchFail(err, chatId));
      });
  };
};
