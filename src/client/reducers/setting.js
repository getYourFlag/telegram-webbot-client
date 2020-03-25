const initialState = {
    applying: false,
    applySuccess: false,
    category: null,
    error: null
}

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setting.RECEIVED_SERVER_CONFIG":
            return { ...initialState, ...action.payload, category: action.category }
        case "setting.FETCH_CONFIG_FAILED":
            return { ...initialState, error: action.payload }
        case "setting.APPLYING_CONFIG":
            return { ...state, applying: true, applySuccess: false }
        case "setting.APPLY_CONFIG_SUCCESS":
            return { ...initialState, applying: false, applySuccess: true, ... action.payload }
        case "setting.APPLY_CONFIG_FAILED":
            return { ...state, applying: false, applySuccess: false, error: action.payload }
        case "setting.WEBHOOK_RESET_SUCCESS":
            return {...state, applying: false, applySuccess: true, category: "webhookReset"}
        case "setting.WEBHOOK_RESET_FAILED":
            return {...state, applying: false, applySuccess: false, category: "webhookReset"}
        default:
            return state;
    }
}

export default settingReducer;