import React, { useRef, useEffect } from 'react';
import '../css/chatDisplay.css';
import { useSelector, useDispatch } from 'react-redux';

import Sendbox from './Sendbox';
import Message from './Message';
import {setMessageUpdate, removeMessageUpdate} from '../services/longpoll';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '90vh'
    },
    chatDisplay: {
        width: '100%',
        height: '60%',
        overflowY: 'scroll',
        flexGrow: 1,

        backgroundColor: '#e0f2f1',

        display: 'flex',
        flexDirection: 'column'
    },
    sendBox: {
        bottom: 0,
        height: '7rem',
        flexGrow: 0
    }
});

const ChatDisplay = props => {
    const messages = useSelector(state => state.messageReducer.messages);
    const currentChat = useSelector(state => state.messageReducer.currentChat);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const messageLoaded = useSelector(state => state.messageReducer.loaded); 

    const containerRef = useRef(null);
    // Scrolls to bottom immediately.
    useEffect(_ => {
        const c = containerRef.current;
        c.scrollTop = c.scrollHeight - c.clientHeight;
    }, [messages]);

    // Long polling of message updates.
    useEffect(_ => {
        setMessageUpdate(currentChat);
        return _ => removeMessageUpdate();
    }, [currentChat]);

    const classes = useStyles();

    return (
    <Grid container className={classes.root} direction="column" alignItems="flex-start">
        <Grid item ref={containerRef} className={classes.chatDisplay}>
            {messages ? messages.map(v => <Message message={v} key={v._id} />): null}
        </Grid>
        <Grid item className={classes.sendBox}>
            {messageLoaded ? <Sendbox currentChat={currentChat} currentBot={currentBot}/> : null}
        </Grid>
    </Grid>);
}

export default ChatDisplay;