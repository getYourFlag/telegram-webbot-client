const initialState = {
    loading: false,
    error: null,
    chats: [],
    action: null,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "chat.FETCHING":
            return {...initialState, loading: true};
        case "chat.ERROR":
            return {...initialState, error: action.payload};
        case "chat.DISPLAY":
            return {...initialState, chats: action.payload};
        case "chat.DELETE":
            state.chats.splice(state,chats.indexOf(action.payload));
            return {...initialState, chats: state.chats, action: 'DELETE'}
        case "chat.ARCHIVE":
            state.chats.splice(state,chats.indexOf(action.payload));
            return {...initialState, chats: state.chats, action: 'ARCHIVE'}
        default:
            return state;
    }
}

export default chatReducer;