const initialState = {
    loaded: false,
    error: null,
    messages: [],
    action: null,
    currentChat: null,
    lastUpdate: Date.now(),
}

const messageReducer = (state = initialState, action) => {
    let messages;
    switch (action.type) {
        case "message.FETCH_FAIL":
            return {...state, messages: [], error: action.payload, currentChat: action.chatId};
        case "message.FETCH_SUCCESS":
            messages = action.payload || [];
            return {...state, loaded: true, messages: messages, error: null, currentChat: action.chatId};
        case "message.APPEND":
            messages = JSON.parse(JSON.stringify(state.messages)).concat(action.payload);
            return {...state, messages: messages}
        case "message.UPDATE":
            if (action.payload.length === 0) return state;
            messages = JSON.parse(JSON.stringify(state.messages)).concat(action.payload);
            return {...state, messages: messages, lastUpdate: Date.now()}
        default:
            return state;
    }
}

export default messageReducer;