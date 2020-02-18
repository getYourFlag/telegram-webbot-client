const initialState = {
    loading: false,
    error: null,
    messages: null,
    action: null
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "messages.FETCHING":
            return {...state, loading: true};
        case "messages.FETCH_FAIL":
            return {...state, loading: false, messages: null, error: action.payload};
        case "messages.FETCH_SUCCESS":
            return {...state, loading: false, messages: action.payload, error: null};
        default:
            return state;
    }
}

export default messageReducer;