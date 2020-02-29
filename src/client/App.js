import React from "react";
import NavBar from "./components/NavBar";
import Router from "./components/Router";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./pages/LoginForm";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    },
    navbar: {
        flexGrow: 0,
    },
    content: {
        flexGrow: 1,
    },
});

const App = props => {
    const isAuth = useSelector(state => state.authReducer.loggedIn);
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <NavBar className={classes.navbar} />
                <Router className={classes.content} />
            </Box>
        </React.Fragment>
    );
};

export default App;
