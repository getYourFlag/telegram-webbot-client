const channelListReducer = (state = [], action) => {
    switch (action.type) {
        case 'channel.SET':
            return action.payload;
        default:
            return state;
    }
}

export default channelListReducer;