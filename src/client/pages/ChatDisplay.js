import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unloadMessages } from "../actions/message";

import MessageBox from "../components/MessageBox";
import Message from "../components/Message";
import { setMessageUpdate, removeMessageUpdate } from "../services/longpoll";
import { Grid, Typography, useMediaQuery, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
    root: {
        height: "90vh",
    },
    chatHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    backIcon: {
        marginLeft: '1rem',
        borderRadius: "10%"
    },
    title: {
        margin: "0.5rem",
        marginLeft: "1rem",
        lineHeight: 1.334,
    },
    chatDisplay: {
        width: "100%",
        height: "60%",
        overflowY: "scroll",
        flexGrow: 1,

        backgroundColor: "#e0f2f1",

        display: "flex",
        flexDirection: "column",

        padding: "1rem",
    },
    messageBox: {
        bottom: 0,
        height: "5.5rem",
        width: "100%",
        flexGrow: 0,
    }
});

const ChatDisplay = props => {
    const messageLoaded = useSelector(state => state.messageReducer.loaded);
    const messages = useSelector(state => state.messageReducer.messages);
    const currentChat = useSelector(state => state.messageReducer.currentChat);
    const currentBot = useSelector(state => state.chatReducer.currentBot);

    const containerRef = useRef(null);

    // Scrolls to bottom immediately.
    useEffect(
        _ => {
            const c = containerRef.current;
            if (c) c.scrollTop = c.scrollHeight - c.clientHeight;
        },
        [messages]
    );

    // Long polling of message updates.
    useEffect(
        _ => {
            setMessageUpdate(currentChat);
            return _ => removeMessageUpdate();
        },
        [currentChat]
    );

    const classes = useStyles();
    const dispatch = useDispatch();

    if (!messageLoaded) return null;

    let chatHeader = null;
    if (currentChat) {
        chatHeader = (
            <div className={classes.chatHeader}>
                <div>
                    <Button
                        variant="contained"
                        className={classes.backIcon}
                        onClick={_ => dispatch(unloadMessages())}>
                        <ArrowBackIcon color="action" />
                    </Button>
                </div>
                <div className={classes.title}>
                    <Typography variant="h5" color="textPrimary">
                        {currentChat.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="span"
                        color="textSecondary">
                        {currentChat.type.substring(0, 1).toUpperCase() + currentChat.type.substring(1).toLowerCase()}
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            alignItems="flex-start">
            <Grid item>{chatHeader}</Grid>
            <Grid item ref={containerRef} className={classes.chatDisplay}>
                {messages
                    ? messages.map(v => <Message message={v} key={v._id} />)
                    : null}
            </Grid>
            <Grid item className={classes.messageBox}>
                <MessageBox currentChat={currentChat} currentBot={currentBot} />
            </Grid>
        </Grid>
    );
};

export default ChatDisplay;
