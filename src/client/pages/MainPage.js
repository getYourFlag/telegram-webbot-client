import React from "react";
import {Redirect} from "react-router-dom";
import ChatMenu from '../components/chatMenu';
import '../css/navbar.css';

const MainPage = props => {
    return (
        <div className = 'content'>
            <ChatMenu />
        </div>
    ); 
};

export default MainPage;
