import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ChatMenu from "./ChatMenu";
import ChatDisplay from "./ChatDisplay";

import { Grid, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        height: "inherit",
        maxHeight: "100vh",
        margin: 0,
        padding: 0
    }
});

const Alert = props => {
    return (
        <Snackbar open={props.open} onClose={props.onClose} autoHideDuration={6000} styles={{zIndex: 2000}}>
            <MuiAlert elevation={4} variant="filled" {...props} />
        </Snackbar>
    );
}

const MainPage = props => {
    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const selectedBot = useSelector(state => state.chatReducer.currentBot);

    const chatError = useSelector(state => state.chatReducer.error);
    const messageError = useSelector(state => state.messageReducer.error);
    const classes = useStyles();

    const [openSnackbar, toggleSnackbar] = React.useState(true);

    let errorDisplay = null;
    if (!isAuthed) return <Redirect to="/login" />;
    if (!selectedBot) return null;
    if (chatError) errorDisplay = (
        <Alert 
            severity="error" 
            open={openSnackbar} 
            onClose={_ => toggleSnackbar(false)}>
            Error in getting chats: {chatError}
        </Alert>);
    if (messageError) errorDisplay = (
        <Alert
            severity="error"
            open={openSnackbar} 
            onClose={_ => toggleSnackbar(false)}>
            Error in sending messages: {messageError}
        </Alert>);

    return (
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={12} md={3} zeroMinWidth>
                <ChatMenu />
            </Grid>
            <Grid item xs={12} md={9}>
                <ChatDisplay />
            </Grid>
            {errorDisplay}
        </Grid>
    );
};

export default MainPage;
