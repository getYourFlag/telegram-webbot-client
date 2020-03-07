import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unloadMessages } from "../actions/message";

import MessageBox from "../components/messages/MessageBox";
import Message from "../components/messages/Message";
import { setMessageUpdate, removeMessageUpdate } from "../services/longpoll";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
    root: {
        height: "inherit",
        maxHeight: "inherit",
        backgroundColor: '#eeeeee'
    },
    chatHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 0
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
        height: "50%",
        overflowY: "scroll",
        flexGrow: 1,
        flexShrink: 0,

        display: "flex",
        flexDirection: "column",
        padding: "1rem",
    },
    messageBox: {
        bottom: 0,
        height: "6rem",
        width: "100%",
        flexShrink: 0
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
            <Grid item className={classes.chatHeader}>
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
            </Grid>
        );
    }

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            alignContent="space-between"
            alignItems="stretch">
            {chatHeader}
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
