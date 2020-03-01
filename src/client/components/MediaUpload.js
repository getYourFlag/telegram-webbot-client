import React, {useState, useRef} from 'react';
import { Backdrop, Box, Typography, Divider, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Media from './Media';
import { mediaTypes } from '../../../config/uploads.json';

import {useDispatch} from 'react-redux';
import { sendMedia } from "../actions/sender";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        color: 'black',
        opacity: 0.7,
        zIndex: 1300
    },
    divider: {
        marginBottom: '2rem'
    },
    uploadBox: {
        width: '60vw',
        height: '70vh',
        backgroundColor: 'white',
        border: '3px #1a237e solid',
        borderRadius: '1rem',
        padding: '1rem',
        zIndex: 1400
    },
    fileBox: {
        margin: 'auto',
        maxWidth: '80%',
        maxHeight: '80%'
    },
    displayBlock: {
        display: 'block',
        maxWidth: '80%',
        maxHeight: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '1rem'
    }
});

const MediaUpload = props => {
    const [caption, setCaption] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleFiles = function(event) {
        setMediaFile(event.target.files);
    }

    const dispatchMedia = _ => {
        const formData = new FormData();
        formData.append('chat_id', props.chat_id);
        formData.append('bot_id', props.bot_id);
        formData.append('caption', caption);
        formData.append('file', mediaFile[0]);

        dispatch(sendMedia(formData, mediaTypes[mediaFile[0].type]));
        props.togglePrompt(false);
    }

    const captionBox = (
        <React.Fragment>
            <TextField
                fullWidth
                label="Caption"
                type="text"
                name="caption"
                variant="outlined"
                multiline={true}
                className={classes.displayBlock}
                rowsMax={3}
                value={caption}
                onChange={e => setCaption(e.target.value)}/>
            <Button
                variant="contained"
                color="primary"
                className={classes.displayBlock}
                onClick={dispatchMedia}>
                Send Media
            </Button>
        </React.Fragment>
    );
    let mediaDisplay = null;

    if (mediaFile) {
        mediaDisplay = (
            <Media 
                src={URL.createObjectURL(mediaFile[0])} 
                styleClass={classes.displayBlock} 
                type={mediaFile[0].type}
                mimeTypes={true} />
        );
    }

    return (
        <div className={classes.root}>
            <Backdrop transitionDuration={1000} open={true} onClick={_ => props.togglePrompt(false)} className={classes.backdrop}/>
            <Box className={classes.uploadBox}>
                <Typography variant="h4" gutterBottom={true} align="center">
                    Media Upload
                </Typography>
                <Divider className={classes.divider}/>
                <Box className={classes.fileBox}>
                    { mediaDisplay }
                    <Button variant="contained" color="default" component="label" className={classes.displayBlock}>
                        Select Media
                        <input type="file" id="message-media" onChange={handleFiles} style={{display: "none"}}/>
                    </Button>
                    { mediaDisplay ? captionBox : null }
                </Box>
            </Box>
        </div>
    );
}

export default MediaUpload;