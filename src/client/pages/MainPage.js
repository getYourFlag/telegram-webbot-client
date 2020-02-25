import React from "react";
import {useSelector} from 'react-redux';
import ChatMenu from '../components/ChatMenu';
import ChatDisplay from '../components/ChatDisplay';

import '../css/navbar.css';
import {Grid, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: 'auto',
        maxHeight: '100vh'
    }
});

const MainPage = props => {
    const selectedBot = useSelector(state => state.chatReducer.currentBot);
    const classes = useStyles();

    if (selectedBot === null) {
        return null;
    }

    return (
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={12} md={3}>
                <ChatMenu />
            </Grid>
            <Grid item xs={12} md={9}>
                <ChatDisplay />
            </Grid>
        </Grid>
    ); 
};

export default MainPage;
