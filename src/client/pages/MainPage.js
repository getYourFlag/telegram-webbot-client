import React from "react";
import {Redirect} from "react-router-dom";

const UserPage = props => {
    return <p>User Page for {localStorage.getItem('user_nick')} Reached!</p>;
};

export default UserPage;
