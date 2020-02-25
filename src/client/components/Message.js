import React, {useEffect, useRef} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
    message: {
        display: 'block',
        width: '60%',
        border: '1px solid',
        borderRadius: '0.5rem',
        padding: '1rem',
        margin: '0.5rem'
    },
    text: {
        color: 'black',
        fontSize: '1rem',
        fontFamily: [
            '"Noto Sans"',
            '"Roboto"',
            'sans-serif'
        ],
        margin: '0.5rem',
    },
    date: {
        fontSize: '0.8rem',
        color: '#303030',
        textAlign: 'right',
        margin: 0
    },
    incomingMessage: {
        borderColor: '#5d99c6',
        backgroundColor: '#90caf9'
    },
    sentMessage: {
        backgroundColor: '#a5d6a7',
        borderColor: '#75a478',
        marginLeft: 'auto'
    }
}));

const Message = props => {
    let palette = props.message.fromUs ? 'sentMessage' : 'incomingMessage';
    const classes = useStyles();
    const messageRef = useRef(null);

    const className = `${classes.message} ${classes[palette]}`

    useEffect(_ => {
        if (props.scrollTarget) {
            messageRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [props.scrollTarget]);

    let date = props.message.date;
    date = new Date(date).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
    <Box className={className} ref={messageRef}>
        <p className={classes.text}>{props.message.text}</p>
        <p className={classes.date}>{date}</p>
    </Box>
    );
}

export default Message;