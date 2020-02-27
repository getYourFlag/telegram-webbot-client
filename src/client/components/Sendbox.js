import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessages } from "../actions/sender";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, FormControl } from "@material-ui/core";

const MessageSender = props => {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            bottom: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            borderTop: "1px",
            borderTopColor: "black",
        },
        button: {
            width: "20%",
            flexGrow: 0,
            height: "2.5rem",
            width: "5rem",
        },
    }));
    const classes = useStyles();

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={2}
        >
            <Grid item>
                <TextField
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
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={_ => {
                        dispatch(
                            sendMessages({
                                text: inputText,
                                chat_id: props.currentChat._id,
                                bot_id: props.currentBot,
                            })
                        );
                        setInputText("");
                    }}
                >
                    SEND
                </Button>
            </Grid>
        </Grid>
    );
};

export default MessageSender;
