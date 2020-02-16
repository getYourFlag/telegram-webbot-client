import React, {useState} from 'react';
import '../css/navbar.css';

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className = 'login-form'>
            <span>Webbot Client</span>
            <div className="login-field">
                <p>Username</p>
                <input type='text' name='username' onChange={e => setUsername(e.target.value)}></input>
            </div>
            <div className="login-field">
                <p>Password</p>
                <input type='password' name='password' onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick={e => {
                e.preventDefault();
                props.login(username, password)
            }}>Login</button>
        </div>
    )
};

export default Login;