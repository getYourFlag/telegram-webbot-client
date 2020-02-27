const initialState = {
    loaded: false,
    error: null,
    chats: [],
    action: null,
    currentBot: null,
    lastUpdate: Date.now(),
};

const getUpdatedChats = (original, updates) => {
    let newChats = JSON.parse(JSON.stringify(original));
    let newChatIDs = newChats.map(v => v._id);

    for (let update of updates) {
        let chatIndex = newChatIDs.indexOf(update._id);
        if (chatIndex !== -1) {
            newChats[chatIndex] = update;
        } else {
            newChats.unshift(update);
        }
    }

    newChats.sort((a, b) => b.latest_update - a.latest_update);
    return newChats;
};

const updateAfterSent = (chats, message) => {
    let newChats = JSON.parse(JSON.stringify(chats));

    for (let chat of newChats) {
        if (chat._id === message.ref_chat_id) {
            chat.latest_message = message;
            chat.latest_update = message.date;
            break;
        }
    }
    newChats.sort((a, b) => b.latest_update - a.latest_update);
    return newChats;
};

const chatReducer = (state = initialState, action) => {
    let chats;
    switch (action.type) {
        case "chat.FETCH_FAIL":
            return { ...state, chats: [], error: action.payload };
        case "chat.FETCH_SUCCESS":
            return {
                ...state,
                chats: action.payload.chats,
                error: null,
                currentBot: action.payload.bot,
            };
        case "chat.DELETE":
        case "chat.ARCHIVE":
            chats = JSON.parse(JSON.stringify(state.chats));
            chats.splice(state.chats.indexOf(action.payload));
            return {
                ...state,
                chats: chats,
                action: action.replace("chat.", ""),
            };
        case "chat.UPDATE":
            if (action.payload.length === 0) return state;
            chats = getUpdatedChats(state.chats, action.payload);
            return { ...state, chats: chats, lastUpdate: Date.now() };
        case "chat.UPDATE_AFTER_SENT":
            chats = updateAfterSent(state.chats, action.payload);
            return { ...state, chats: chats, lastUpdate: Date.now() };
        default:
            return state;
    }
};

export default chatReducer;
