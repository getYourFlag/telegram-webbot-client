const initialState = {
    user_id: null,
    nick: null,
    error: null,
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "auth.AUTHENTICATING":
            return { ...initialState, loading: true }
        case "auth.ERROR":
            return { ...initialState, error: action.error };
        case "auth.SUCCESS":
            return { ...initialState, user_id: action.payload.data.user_id, user_nick: action.payload.data.nick };
        case "auth.LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
