import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import LoginForm from '../pages/Login';

const UserRoute = () => <p>User Route Reached!</p>

const Router = props => {
    function login(username, password) {
        console.log(username);
        console.log(password);
    }

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" 
                    render = {props => <LoginForm {...props} login={login} />}
                />
                <Route path="/user" component={UserRoute}/>
            </Switch>
        </HashRouter>
    );
}

export default Router