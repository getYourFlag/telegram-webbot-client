import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Menu, MenuItem } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import { sendMessages } from "../actions/sender";
import MediaUpload from "./MediaUpload";

const MessageSender = props => {
    const [inputText, setInputText] = useState("");
    const [showMenu, toggleMenu] = useState(null);
    const [showUploadPrompt, toggleUploadPrompt] = useState(false);
    const dispatch = useDispatch();

    const useStyles = makeStyles(theme => ({
        root: {
            bottom: 0,
            margin: 0,
            width: "90%",
            height: "100%",
            borderTop: "1px",
            borderTopColor: "black",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxHeight: "3rem",
            padding: 0
        },
        button: {
            display: "block",
            padding: "auto",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        addButton: {
            display: "block",
            padding: "auto",
            borderRadius: "50%",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        svg: {
            padding: 'auto'
        }
    }));
    const classes = useStyles();
    const closeMenu = _ => {
        toggleMenu(null);
        toggleUploadPrompt(true);
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={2}>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    type="text"
                    name="message"
                    size="small"
                    variant="outlined"
                    className={classes.input}
                    multiline={true}
                    rowsMax={3}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
            </Grid>
            <Grid item xs={3} className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={_ => {
                        dispatch(
                            sendMessages({
                                text: inputText,
                                chat_id: props.currentChat._id,
                                bot_id: props.currentBot._id,
                            })
                        );
                        setInputText("");
                    }}>
                    SEND
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => toggleMenu(e.target)}>
                    <AddIcon />
                </Button>
                <Menu
                    anchorEl={showMenu}
                    open={Boolean(showMenu)}
                    onClose={closeMenu}>
                        <MenuItem onClick={closeMenu}>Image / Photo</MenuItem>
                        <MenuItem onClick={closeMenu}>Document</MenuItem>
                </Menu>
            </Grid>
            {showUploadPrompt ? 
                <MediaUpload togglePrompt={toggleUploadPrompt} 
                    chat_id={props.currentChat._id} 
                    bot_id={props.currentBot._id}/> 
            : null}
        </Grid>
    );
};

export default MessageSender;
