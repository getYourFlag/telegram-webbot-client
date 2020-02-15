import React from "react";
import "../css/navbar.css";

const NavBar = props => {
  return (
    <div className="navbar">
      <ul className="list-start">
        <li className="navbar-icon">WebBot Client</li>
      </ul>
      <ul className="list-end">
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
