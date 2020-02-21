const initialState = {
    error: null,
    messages: [],
    action: null,
    currentChat: null
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "message.FETCH_FAIL":
            return {...state, loading: false, messages: [], error: action.payload, currentChat: action.chatId};
        case "message.FETCH_SUCCESS":
            return {...state, loading: false, messages: action.payload, error: null, currentChat: action.chatId};
        case "message.APPEND":
            messages = state.messages;
            messages.push(action.payload);
            return {...state, messages: messages}
        default:
            return state;
    }
}

export default messageReducer;