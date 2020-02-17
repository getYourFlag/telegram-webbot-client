import axios from '../services/axios';

export const SUCCESS = 'auth.SUCCESS';
export const AUTHENTICATING = 'auth.AUTHENTICATING';
export const LOGOUT = 'auth.LOGOUT';
export const ERROR = 'auth.ERROR';

export const logout = () => {
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
        return axios.post('/user/login', {username, password}).then(data => {
            dispatch(authSuccess(data))
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}
