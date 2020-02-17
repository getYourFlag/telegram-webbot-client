import axios from '../services/axios';

export const SUCCESS = 'auth.SUCCESS';
export const AUTHENTICATING = 'auth.AUTHENTICATING';
export const LOGOUT = 'auth.LOGOUT';
export const ERROR = 'auth.ERROR';

export const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nick');
    return { type: LOGOUT };
};

export const authenticate = () => {
    return { type: AUTHENTICATING, loading: true };
}

export const authSuccess = data => {
    return { type: SUCCESS, payload: data };
}

export const authFail = err => {
    return { type: ERROR, error: err };
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authenticate());
        return axios.post('/user/login', {username, password}).then(res => {
            localStorage.setItem('user_nick', res.data.nick);
            localStorage.setItem('user_id', res.data.user_id);
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}
