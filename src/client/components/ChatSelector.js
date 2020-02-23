import React from 'react';

const ChatSelector = props => (
    <div className = 'chat-selector' onClick={props.getMessages}>
        <p><span className='chat-title'>{props.title}</span><span className='chat-time'>{props.date}</span></p>
        <p className = 'chat-dialog'>{props.dialog}</p>
    </div>
);

export default ChatSelector