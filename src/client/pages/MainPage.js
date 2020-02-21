import React from "react";
import {Redirect} from "react-router-dom";
import ChatMenu from '../components/ChatMenu';
import ChatDisplay from '../components/ChatDisplay';
import '../css/navbar.css';

const MainPage = props => {
    return (
        <div className = 'content'>
            <ChatMenu />
            <ChatDisplay />
        </div>
    ); 
};

export default MainPage;
