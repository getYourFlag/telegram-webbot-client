const initialState = {
    loggedIn: localStorage.getItem('user_nick'),
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
            return { ...initialState, loggedIn: true};
        case "auth.LOGOUT":
            return { ...initialState, loggedIn: null};
        default:
            return state;
    }
};

export default authReducer;
