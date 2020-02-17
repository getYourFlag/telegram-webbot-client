import React, { useState } from "react";
import "../css/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { auth, logout } from "../actions/auth";
import { Redirect } from 'react-router-dom';

const LoginForm = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const isLoading = useSelector(state => state.authReducer.loading);
    const error = useSelector(state => state.authReducer.error);
    const dispatch = useDispatch();

    if (isAuthed) {
        return <Redirect to = '/user' />
    }

    return (
        <div className="login-form">
            <span>Webbot Client</span>
            {error ? 
                <div className="login-error">
                    <p>{error.message}</p>
                </div> : null
            }
            <div className="login-field">
                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                ></input>
            </div>
            <div className="login-field">
                <p>Password</p>
                <input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                ></input>
            </div>
            <button onClick={_ => dispatch(auth(username, password))}>Login</button>

            {isLoading ? <p>Logging in ......</p> : null}
        </div>
    );
};

export default LoginForm;
