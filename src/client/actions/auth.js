import axios from "../services/axios";

export const SUCCESS = "auth.SUCCESS";
export const LOGOUT = "auth.LOGOUT";
export const ERROR = "auth.ERROR";

export const logout = () => {
    return { type: LOGOUT };
};

export const authSuccess = data => {
    return { type: SUCCESS, payload: data };
};

export const authFail = err => {
    return { type: ERROR, error: err };
};

export const auth = (username, password) => {
    return dispatch => {
        return axios
            .post("/users/login", { username, password })
            .then(res => {
                localStorage.setItem("user_nick", res.data.nick);
                localStorage.setItem("user_id", res.data.user_id);
                dispatch(authSuccess(res.data));
            })
            .catch(error => {
                dispatch(authFail(error.response.data));
            });
    };
};
