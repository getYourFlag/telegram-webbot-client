import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";

const Router = props => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={MainPage} />
            </Switch>
        </HashRouter>
    );
};

export default Router;
