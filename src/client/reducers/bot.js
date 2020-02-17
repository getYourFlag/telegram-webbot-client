const initialState = {
    bots: []
}

const botListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'bot.SET':
            return {bots: action.payload};
        default:
            return initialState;
    }
}

export default botListReducer;