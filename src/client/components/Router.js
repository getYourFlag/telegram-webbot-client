import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginForm from "../pages/Login";
import MainPage from "../pages/MainPage";

const Router = props => {
    function login(username, password) {
        console.log(username);
        console.log(password);
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
