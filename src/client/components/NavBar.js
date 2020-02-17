import React from "react";
import "../css/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { auth, logout } from "../actions/auth";
import { Redirect } from 'react-router-dom'

const NavBar = props => {
  const isAuthed = useSelector(state => state.authReducer.user_nick);

  return (
    <div className="navbar">
      <ul className="list-start">
        <li className="navbar-icon">WebBot Client</li>
      </ul>
      <ul className="list-end">
        <li>
          {isAuthed ? <a href="/#/logout">Logout</a> : <a href="/">Login</a>}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
