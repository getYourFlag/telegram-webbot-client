import React from "react";
import NavBar from "./components/NavBar";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginForm";

const useStyles = makeStyles({
    root: {
        height: "100vh"
    },
    navbar: {
        flexGrow: 0,
    },
    content: {
        flexGrow: 1,
        '&:children': {
            height: "100%"
        }
    },
});

const App = props => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
