import React, { useEffect } from 'react';
import '../css/chatmenu.css';
import { useDispatch, useSelector } from "react-redux";
import Selector from '../components/ChatSelector';
//import {updateChat} from '../actions/chat';
import {setChatUpdate, removeChatUpdate} from '../services/longpoll';
import {fetchMessages} from '../actions/message';

const ChatMenu = props => {
    const chatList = useSelector(state => state.chatReducer.chats);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const dispatch = useDispatch();
    let updateIntervalId;

    useEffect(_ => {
        //clearInterval(updateIntervalId);
        //updateIntervalId = setInterval(_ => dispatch(updateChat(currentBot._id)), 5000);
        setChatUpdate(currentBot._id);
        return _ => removeChatUpdate();
    }, [currentBot]);

    return (
    <div className = 'chat-menu'>
        <div className = 'bot-name'>{currentBot.name}</div>
        {chatList.map(chat => 
            <Selector 
                title={chat.title} 
                dialog={chat.latest_message ? chat.latest_message.text : ''}
                key={chat._id}
                getMessages={_ => dispatch(fetchMessages(chat._id))}/>
            )}
    </div>);
}


export default ChatMenu;