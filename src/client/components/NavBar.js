import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { fetchBotList } from "../actions/bot";
import { fetchChats } from "../actions/chat";

const NavBar = props => {
    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const botList = useSelector(state => state.botReducer.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthed) {
            dispatch(fetchBotList());
        }
    }, [isAuthed]);

    const useStyles = makeStyles(theme => ({
        root: { flexGrow: 1 },
        menuButton: { marginRight: theme.spacing(2) },
        title: { flexGrow: 1 },
        button: { marginRight: theme.spacing(2) },
    }));
    const classes = useStyles();

    return (
        <div>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Webbot Client
                    </Typography>
                    {isAuthed && botList
                        ? botList.map(bot => (
                              <Button
                                  variant="contained"
                                  className={classes.button}
                                  key={bot._id}
                                  onClick={_ => dispatch(fetchChats(bot))}>
                                  {bot.name}
                              </Button>
                          ))
                        : null}
                    {isAuthed ? (
                        <Button
                            variant="contained"
                            onClick={_ => dispatch(logout())}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" href="/login">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
