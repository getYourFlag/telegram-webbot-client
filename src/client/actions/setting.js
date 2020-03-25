import axios from "../services/axios";

const RECEIVED_SERVER_CONFIG = 'setting.RECEIVED_SERVER_CONFIG';
const FETCH_CONFIG_FAILED = 'setting.FETCH_CONFIG_FAILED';
const APPLYING_CONFIG = 'setting.APPLYING_CONFIG';
const APPLY_CONFIG_SUCCESS = 'setting.APPLY_CONFIG_SUCCESS';
const APPLY_CONFIG_FAILED = 'setting.APPLY_CONFIG_FAILED';
const WEBHOOK_RESET_SUCCESS = 'setting.WEBHOOK_RESET_SUCCESS';
const WEBHOOK_RESET_FAILED = 'setting.WEBHOOK_RESET_FAILED';

const applyingConfig = _ => {
    return {type: APPLYING_CONFIG}
}

const receivedConfig = (data, category) => {
    return {type: RECEIVED_SERVER_CONFIG, payload: data, category}
}

const errorReceivingConfig = err => {
    return {type: FETCH_CONFIG_FAILED, payload: err}
}

const appliedConfig = (data, category) => {
    return {type: APPLY_CONFIG_SUCCESS, payload: data, category}
}

export const applyConfigFailed = err => {
    return {type: APPLY_CONFIG_FAILED, payload: err}
}

const webhookResetSuccess = _ => {
    return {type: WEBHOOK_RESET_SUCCESS}
}

const webhookResetFailed = err => {
    return {type: WEBHOOK_RESET_FAILED, payload: err}
}

export const fetchServerConfig = category => {
    return dispatch => {
        return axios
            .get(`/settings`)
            .then(res => {
                dispatch(receivedConfig(res.data, category));
            })
            .catch(err => {
                err = err.response.data;
                let errorMsg = errors.sendMsg[err.error_code] || errors.default;
                dispatch(errorReceivingConfig(errorMsg));
            });
    }
}

export const applyConfig = data => {
    return dispatch => {
        dispatch(applyingConfig());
        return axios
            .post(`/settings/${data.category}`, data)
            .then(res => {
                dispatch(appliedConfig(res.data, data.category));
            })
            .catch(err => {
                err = err.response.data;
                let errorMsg = errors.sendMsg[err.error_code] || errors.default;
                dispatch(applyConfigFailed(errorMsg));
            });
    }
}

export const resetWebhook = url => {
    return dispatch => {
        return axios
            .get(`/bots/resetWebhook?url=${url}`)
            .then(res => {
                dispatch(webhookResetSuccess());
            })
            .catch(err => {
                err = err.response.data;
                let errorMsg = errors.sendMsg[err.error_code] || errors.default;
                dispatch(webhookResetFailed(errorMsg));
            });
    }
}