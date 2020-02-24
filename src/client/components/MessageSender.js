import React, {useState} from 'react';
import '../css/chatDisplay.css';
import { useDispatch } from 'react-redux';
import { sendMessages } from '../actions/sender';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Box } from '@material-ui/core';

const MessageSender = props => {
    const [inputText, setInputText] = useState('')
    const dispatch = useDispatch();

    const useStyles = makeStyles(theme => ({
        root: {
            bottom: 0,
            margin: 0,
            padding: theme.spacing(2),
            borderTop: '1px',
            borderTopColor: 'black',
        },
        input: {
            width: '80%'
        }
    }));
    const classes = useStyles();

    return (
    <Box className={classes.root}>
        <TextField type='text' name='message' variant='outlined'
            className={classes.input} multiline={true} rowsMax={3}
            value={inputText} onChange={e => setInputText(e.target.value)} />
        <button className='send-button' onClick={_ => {
            dispatch(sendMessages({
                text: inputText,
                chat_id: props.currentChat,
                bot_id: props.currentBot
            }));
            setInputText('');
        }}>SEND</button>
    </Box>);
}

export default MessageSender;