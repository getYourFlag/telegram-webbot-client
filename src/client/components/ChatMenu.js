import React from 'react';
import '../css/chatmenu.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chat";

const ChatMenu = props => {
    const chatList = useSelector(state => state.chatReducer.chats);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const dispatch = useDispatch();

    return (<div className = 'chat-menu'>
        {currentBot ? <div className = 'bot-name'>{currentBot.name}</div> : null}
        {chatList ? chatList.map(chat => <Selector 
            chatTitle={chat.title} 
            type='chat' 
            dialog={chat.latest_message.text || ''}
            key={chat._id}/>): null}
    </div>);
}

const Selector = props => (
    <div className = 'chat-selector'>
        <p className = 'chat-title'>{props.chatTitle}</p>
        <p className = 'chat-dialog'>{props.dialog}</p>
    </div>
);

export default ChatMenu;