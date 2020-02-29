import React from "react";
import { useSelector } from "react-redux";
import ChatMenu from "./ChatMenu";
import ChatDisplay from "./ChatDisplay";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        height: "inherit",
        maxHeight: "100vh",
        margin: 0,
        padding: 0
    }
});

const MainPage = props => {
    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const selectedBot = useSelector(state => state.chatReducer.currentBot);
    const classes = useStyles();

    if (!isAuthed) {
        return <Redirect to="/login" />;
    }

    if (!selectedBot) {
        return null;
    }

    return (
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={12} md={3} zeroMinWidth>
                <ChatMenu />
            </Grid>
            <Grid item xs={12} md={9}>
                <ChatDisplay />
            </Grid>
        </Grid>
    );
};

export default MainPage;
