const initialState = {
    list: null,
    loading: false,
    error: null,
};

const botListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "bot.LIST_LOADING":
            return { ...state, loading: true };
        case "bot.LIST_SUCCESS":
            return {
                ...state,
                list: action.payload,
                error: null,
                currentBot: null,
            };
        case "bot.LIST_ERROR":
            return {
                ...state,
                error: action.payload,
                list: null,
                currentBot: null,
            };
        default:
            return state;
    }
};

export default botListReducer;
