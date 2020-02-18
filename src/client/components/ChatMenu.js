import React from 'react';
import '../css/chatmenu.css';
import { useDispatch, useSelector } from "react-redux";
import Selector from '../components/ChatSelector';
import {fetchMessages} from '../actions/message';

const ChatMenu = props => {
    const chatList = useSelector(state => state.chatReducer.chats);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const dispatch = useDispatch();

    return (<div className = 'chat-menu'>
        {currentBot ? <div className = 'bot-name'>{currentBot.name}</div> : null}
        {chatList ? chatList.map(chat => <Selector 
            title={chat.title} 
            dialog={chat.latest_message.text || ''}
            key={chat._id}
            getMessages={_ => dispatch(fetchMessages(chat._id))}/>)
            : null}
    </div>);
}


export default ChatMenu;