import axios from '../services/axios';

const FETCHING = 'message.FETCHING';
const SUCCESS = 'message.FETCH_SUCCESS';
const FAIL = 'message.FETCH_FAIL';

export const fetchingMessages = () => {
    return {type: FETCHING, loading: true};
}

export const fetchSuccess = messages => {
    return {type: SUCCESS, payload: messages};
}

export const fetchFail = err => {
    return {type: FAIL, payload: err};
}

export const fetchMessages = chatId => {
    return dispatch => {
        dispatch(fetchingMessages());
        return axios.get('/messages/' + chatId).then(res => {
            dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchFail(err));
        });
    }
}