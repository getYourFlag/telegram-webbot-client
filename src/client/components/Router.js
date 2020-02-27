import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginForm";

const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
