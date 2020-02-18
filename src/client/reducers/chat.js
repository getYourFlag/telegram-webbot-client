const initialState = {
    loading: false,
    error: null,
    chats: null,
    action: null,
    currentBot: null
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "chat.FETCHING":
            return {...state, loading: true};
        case "chat.FETCH_FAIL":
            return {...state, chats: null, error: action.payload};
        case "chat.FETCH_SUCCESS":
            return {...state, chats: action.payload.chats, error: null, currentBot: action.payload.bot};
        case "chat.DELETE":
            state.chats.splice(state.chats.indexOf(action.payload));
            return {...state, chats: state.chats, action: 'DELETE'}
        case "chat.ARCHIVE":
            state.chats.splice(state.chats.indexOf(action.payload));
            return {...state, chats: state.chats, action: 'ARCHIVE'}
        default:
            return state;
    }
}

export default chatReducer;