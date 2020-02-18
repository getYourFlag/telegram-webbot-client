import React from 'react';

const ChatSelector = props => (
    <div className = 'chat-selector' onClick={props.getMessages}>
        <p className = 'chat-title'>{props.title}</p>
        <p className = 'chat-dialog'>{props.dialog}</p>
    </div>
);

export default ChatSelector