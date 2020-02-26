import axios from '../services/axios';

export const LIST_LOADING = 'bot.LOADING_LIST';
export const LIST_SUCCESS = 'bot.LIST_SUCCESS';
export const LIST_ERROR = 'bot.LIST_ERROR';

export const loadingBotList = () => {
    return { type: LIST_LOADING };
};

export const botListSuccess = data => {
    return { type: LIST_SUCCESS, payload: data}
}

export const botListError = data => {
    return { type: LIST_ERROR, payload: data}
}

export const redirectToLogin = _ => {
    return { type: 'auth.LOGOUT' }
}

export const fetchBotList = () => {
    return dispatch => {
        dispatch(loadingBotList());
        return axios.get('/bots/list').then(res => {
            dispatch(botListSuccess(res.data));
        })
        .catch(err => {
            dispatch(botListError(err));
            dispatch(redirectToLogin());
        })
    }
}
