import React, { useEffect } from "react";
import "../css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { fetchBotList } from '../actions/bot';
import { fetchChats } from '../actions/chat';

const NavBar = props => {
  const isAuthed = useSelector(state => state.authReducer.loggedIn);
  const botList = useSelector(state => state.botReducer.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthed) {
      dispatch(fetchBotList())
    }
  }, [dispatch, isAuthed]);

  return (
    <div className="navbar">
      <ul className="list-start">
        <li className="navbar-icon">WebBot Client</li>
          {botList ? botList.map(bot => (
            <li className="navbar-item" key={bot._id}>
              <a href="#" onClick = {_ => dispatch(fetchChats(bot))}>{bot.name}</a>
            </li>
          )) : null}
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
