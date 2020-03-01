import React, { useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import Media from './Media';
import { makeStyles } from "@material-ui/core/styles";
import config from "../../../config/dev.json";

const useStyles = makeStyles({
    message: {
        display: "block",
        width: "60%",
        border: "1px solid",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        margin: "0.5rem",
    },
    messageSmall: {
        display: "block",
        width: "85%",
        border: "1px solid",
        borderRadius: "0.25rem",
        padding: "0.25rem",
        margin: "0.25rem",
    },
    text: {
        color: "black",
        fontSize: "1rem",
        fontFamily: ['"Noto Sans"', '"Roboto"', "sans-serif"],
        margin: "0.5rem",
        wordWrap: 'break-word',
        whiteSpace: 'pre-line'
    },
    date: {
        fontSize: "0.8rem",
        color: "#303030",
        textAlign: "right",
        margin: 0,
    },
    incomingMessage: {
        borderColor: "#5d99c6",
        backgroundColor: "#90caf9",
    },
    sentMessage: {
        backgroundColor: "#a5d6a7",
        borderColor: "#75a478",
        marginLeft: "auto",
    },
    media: {
        display: "block",
        maxWidth: "90%",
        maxHeight: "30vh",
        marginLeft: "auto",
        marginRight: "auto",
    },
});

const Message = props => {
    const isSingleColumn = useMediaQuery("(min-width:960px)");
    let palette = props.message.fromUs ? "sentMessage" : "incomingMessage";
    let msgClass = isSingleColumn ? "message" : "messageSmall";
    const classes = useStyles();
    const messageRef = useRef(null);
    const className = `${classes[msgClass]} ${classes[palette]}`;

    useEffect(
        _ => {
            if (props.scrollTarget) {
                messageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        },
        [props.scrollTarget]
    );

    let date = new Date(props.message.date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    let media = null;
    if (props.message.media_link) {
        let mediaLink = config["backend-url"] + props.message.media_link;
        media = <Media src={mediaLink} type={props.message.media_type} styleClass={classes.media} mimeTypes={false} />
    }

    return (
        <Box className={className} ref={messageRef}>
            {media}
            <p className={classes.text}>{props.message.text}</p>
            <p className={classes.date}>{date}</p>
        </Box>
    );
};

export default Message;
