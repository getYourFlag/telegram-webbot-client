import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import MainPage from "../pages/MainPage";
import axios from '../helpers/axios';

const Router = props => {
    function login(username, password) {
        console.log(`Username: ${username}, Password: ${password}`);
    }

    return (
        <HashRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={props => <LoginForm {...props} login={login} />}
                />
                <Route path="/user" component={MainPage} />
            </Switch>
        </HashRouter>
    );
};

export default Router;
