import React from 'react';
import '../css/chatDisplay.css';
import { useSelector, useDispatch } from 'react-redux';
import MessageSender from './MessageSender';

const ChatDisplay = props => {
    const messages = useSelector(state => state.messageReducer.messages);
    const currentChat = useSelector(state => state.messageReducer.currentChat);
    const currentBot = useSelector(state => state.chatReducer.currentBot);

    return (
    <div className = 'chat-display'>
        <div className = 'chat-container'>
        {messages ? messages.map(message => {
            let className = 'chat-message';
            if (message.fromUs) className += ' own-message';

            return (
            <div className = {className} key={message._id}>
                <p className = 'message-text'>{message.text}</p>
                <p className = 'message-date'>{message.date}</p>
            </div>
            );
        }): null}
        </div>
        <MessageSender currentChat={currentChat} currentBot={currentBot}/>
    </div>);
}

export default ChatDisplay;