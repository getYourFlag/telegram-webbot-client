import React from 'react';
import '../css/navbar.css';

const Login = props => {
    return (
        <div className = 'login-form'>
            <span>Webbot Client</span>
            <div className="login-field">
                <p>Username</p>
                <input type='text' name='username'></input>
            </div>
            <div className="login-field">
                <p>Password</p>
                <input type='password' name='password'></input>
            </div>
            <button>Login</button>
        </div>
    )
};

export default Login;