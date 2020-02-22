import React from "react";
import {useSelector} from 'react-redux';
import ChatMenu from '../components/ChatMenu';
import ChatDisplay from '../components/ChatDisplay';
import '../css/navbar.css';

const MainPage = props => {
    const currentBot = useSelector(state => state.chatReducer.currentBot);

    if (currentBot === null) {
        return null;
    }

    return (
        <div className = 'content'>
            <ChatMenu />
            <ChatDisplay />
        </div>
    ); 
};

export default MainPage;
