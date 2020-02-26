import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Selector from '../components/ChatSelector';
import {setChatUpdate, removeChatUpdate} from '../services/longpoll';
import {fetchMessages} from '../actions/message';
import transformDate from '../services/dateTransform';

import {List, Typography, Box} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const ChatMenu = props => {
    const chatList = useSelector(state => state.chatReducer.chats);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const dispatch = useDispatch();

    useEffect(_ => {
        setChatUpdate(currentBot._id);
        return _ => removeChatUpdate();
    }, [currentBot]);

    const useStyles = makeStyles(theme => ({
        root: {
            borderRight: "2px",
            borderRightColor: "#999"
        },
        title: {
            margin: theme.spacing(2),
            textAlign: 'center'
        }
    }));
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <List>
                <Typography variant='h5' className = {classes.title}>
                    {currentBot.name}
                </Typography>
                <Divider />
                {chatList.map(chat => 
                    <Selector 
                        title={chat.title} 
                        dialog={chat.latest_message ? chat.latest_message.text : ''}
                        date={transformDate(chat.latest_update)}
                        key={chat._id}
                        getMessages={_ => dispatch(fetchMessages(chat._id))}/>
                    )}
            </List>
        </Box>
    );
}


export default ChatMenu;