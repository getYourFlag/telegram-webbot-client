import React, { useRef, useEffect } from 'react';
import '../css/chatDisplay.css';
import { useSelector, useDispatch } from 'react-redux';

import MessageSender from './MessageSender';
import Message from './Message';
// import {updateMessages} from '../actions/message';
import {setMessageUpdate, removeMessageUpdate} from '../services/longpoll';

const ChatDisplay = props => {
    const messages = useSelector(state => state.messageReducer.messages);
    const currentChat = useSelector(state => state.messageReducer.currentChat);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const messageLoaded = useSelector(state => state.messageReducer.loaded);

    const containerRef = useRef(null);
    // Scrolls to bottom immediately.
    useEffect(_ => {
        const c = containerRef.current;
        c.scrollTop = c.scrollHeight - c.clientHeight;
    }, [messages]);

    // Long polling of message updates.
    useEffect(_ => {
        setMessageUpdate(currentChat);
        return _ => removeMessageUpdate();
    }, [currentChat]);

    return (
    <div className = 'chat-display'>
        <div className = 'chat-container' ref={containerRef}>
            {messages ? messages.map(v => <Message message={v} key={v._id} />): null}
        </div>
        {messageLoaded ? <MessageSender currentChat={currentChat} currentBot={currentBot}/> : null}
    </div>);
}

export default ChatDisplay;