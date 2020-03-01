const initialState = {
    loaded: false,
    error: null,
    messages: [],
    action: null,
    currentChat: null,
    lastUpdate: Date.now(),
};

const getUpdatedMessages = (original, updates) => {
    let newMessages = JSON.parse(JSON.stringify(original));
    let newMessageIDs = newMessages.map(v => v._id);
    for (let update of updates) {
        if (newMessageIDs.indexOf(update._id) === -1) {
            newMessages.push(update);
        }
    }
    return newMessages;
};

const messageReducer = (state = initialState, action) => {
    let messages;
    switch (action.type) {
        case "message.FETCH_FAIL":
            return {
                ...state,
                messages: [],
                error: action.payload,
                currentChat: action.chat,
            };
        case "message.FETCH_SUCCESS":
            messages = action.payload || [];
            return {
                ...state,
                loaded: true,
                messages: messages,
                error: null,
                currentChat: action.chat,
            };
        case "message.APPEND":
            messages = JSON.parse(JSON.stringify(state.messages)).concat(
                action.payload
            );
            return { ...state, messages: messages, error: null };
        case "message.UPDATE":
            if (action.payload.length === 0) return state;
            messages = getUpdatedMessages(state.messages, action.payload);
            return { ...state, 
                messages: messages, 
                error: null,
                lastUpdate: Date.now() };
        case "message.SEND_FAIL":
            return {
                ...state,
                error: action.payload
            };
        case "message.UNLOAD":
            return initialState;
        default:
            return state;
    }
};

export default messageReducer;
