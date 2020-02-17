import React from "react";
import {Redirect} from "react-router-dom";
import ChatMenu from '../components/chatMenu';
import './css/navbar.css';

const MainPage = props => {
    return (
        <div className = 'content'>
            <p>User Page for {localStorage.getItem('user_nick')} Reached!</p>
        </div>
    ); 
};

export default MainPage;
