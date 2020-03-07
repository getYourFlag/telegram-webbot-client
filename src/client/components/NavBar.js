import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import SideDrawer from './SideDrawer';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { fetchBotList } from "../actions/bot";
import { fetchChats } from "../actions/chat";

const NavBar = props => {
    const isAuthed = useSelector(state => state.authReducer.loggedIn);
    const botList = useSelector(state => state.botReducer.list);
    const currentBot = useSelector(state => state.chatReducer.currentBot);
    const dispatch = useDispatch();
    const [openDrawer, toggleDrawer] = useState(false);

    useEffect(() => {
        if (isAuthed) dispatch(fetchBotList());
    }, [isAuthed]);

    const useStyles = makeStyles(theme => ({
        root: { flexGrow: 1 },
        menuButton: { marginRight: theme.spacing(2) },
        title: { flexGrow: 1 },
        button: { marginRight: theme.spacing(2) },
    }));
    const classes = useStyles();

    let title = props.title || currentBot || "Webbot Client";
    if (currentBot && title === currentBot) title = 'Webbot Client - ' + currentBot.name;
    let position = props.position || "static";

    return (
        <AppBar color="primary" position={position}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={_ => toggleDrawer(true)}>
                    <MenuIcon style={{color: 'white'}}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {title}
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
            {openDrawer ? <SideDrawer open={openDrawer} close={_ => toggleDrawer(false)} /> : null}
        </AppBar>
    );
};

export default NavBar;
