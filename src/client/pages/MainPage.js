import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import NavBar from '../components/NavBar';
import ChatMenu from "./ChatMenu";
import ChatDisplay from "./ChatDisplay";

import { Grid, Snackbar, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        height: "100vh",
        maxHeight: "100vh"
    },
    navbar: {
        flexGrow: 0
    },
    content: {
        height: "50%",
        flexGrow: 1
    },
    subContainer: {
        height: "100%"
    },
    children: {
        height: "inherit",
        maxHeight: "inherit",
        minWidth: 0,
        minHeight: 0
    }
});

const ErrorDisplay = props => {
    return (
        <Snackbar 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            key={`top,center`}
            open={props.open} 
            onClose={props.onClose} 
            autoHideDuration={6000} 
            styles={{zIndex: 2000}}>
            <MuiAlert elevation={4} variant="filled" severity="error">
                {props.children}
            </MuiAlert>
        </Snackbar>
    )
}

const MainPage = props => {
    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const selectedBot = useSelector(state => state.chatReducer.currentBot);
    const messageLoaded = useSelector(state => state.messageReducer.loaded);

    const chatError = useSelector(state => state.chatReducer.error);
    const messageError = useSelector(state => state.messageReducer.error);
    const classes = useStyles();

    const [openSnackbar, toggleSnackbar] = React.useState(true);
    const mediaQuery = useMediaQuery("(min-width:960px)");

    let error = chatError || messageError;
    let errorPrompt = null;

    let loadChatMenu = true;
    let loadChatDisplay = true;

    if (!mediaQuery) {
        loadChatDisplay = messageLoaded;
        loadChatMenu = !loadChatDisplay;
    }

    if (!isAuthed) return <Redirect to="/login" />;

    if (error) {
        errorPrompt = (
            <ErrorDisplay 
                open={openSnackbar}
                onClose={_ => toggleSnackbar(false)}>
                Error in {error.action}: {error.message}
            </ErrorDisplay>
        );
    }

    if (!selectedBot) {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="stretch">
                <Grid item className={classes.navbar}>
                    <NavBar />
                </Grid>
                {errorPrompt}
            </Grid>
        );
    }

    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={classes.root}>
            <Grid item className={classes.navbar}>
                <NavBar />
            </Grid>
            <Grid item className={classes.content}>
                <Grid container spacing={0} className={classes.subContainer}>
                    {loadChatMenu ? 
                    <Grid item xs={12} md={3} className={classes.children}>
                        <ChatMenu />
                    </Grid> : null}
                    {loadChatDisplay ?
                    <Grid item xs={12} md={9} className={classes.children}>
                        <ChatDisplay />
                    </Grid> : null}
                    {errorPrompt}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainPage;
