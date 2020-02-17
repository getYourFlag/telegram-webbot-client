import React from 'react';
import '../css/selectmenu.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chat";

const ChatMenu = props => {
    <div className = 'chat-menu'>
        
    </div>
}

const Selector = props => (
    <div className = 'chat-selector'>
        <p className = 'chat-title'>{props.chatTitle}</p>
        {props.type === 'chat' ? <p className = 'chat-dialog'>{props.dialog}</p> : null}
        {props.type === 'setting' ? <p className = 'chat-setting'>{props.setting}</p> : null}
    </div>
);

export default ChatMenu;