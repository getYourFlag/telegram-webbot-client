import React from "react";
import "../css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const NavBar = props => {
  const isAuthed = useSelector(state => state.authReducer.loggedIn);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <ul className="list-start">
        <li className="navbar-icon">WebBot Client</li>
      </ul>
      <ul className="list-end">
        <li>
          {isAuthed ? <a href="/" onClick={_ => dispatch(logout())}>Logout</a> : <a href="/">Login</a>}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
