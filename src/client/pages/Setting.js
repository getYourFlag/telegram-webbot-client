import React from 'react';
import { useParams } from 'react-router';
import { Grid, Box, CssBaseline, useMediaQuery, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/NavBar';
import SettingList from '../components/SettingList';
import WebhooksPage from '../components/settings/Webhooks';
import MePage from '../components/settings/Me';
import BotsPage from '../components/settings/Bots';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        maxHeight: '100vh'
    },
    navbar: {
        flexGrow: 0
    },
    content: {
        flexGrow: 1
    },
    page: {
        padding: '2rem'
    },
    selector: {
        borderRight: '1px solid #aaa'
    }
}));

const Setting = props => {
    const classes = useStyles();
    let { page } = useParams();
    page = page ? page.toLowerCase() : "webhooks";

    switch (page) {
        case "webhooks":
            var settingPage = <WebhooksPage />;
            break;
        case "me":
            var settingPage = <MePage />;
            break;
        case "bots":
            var settingPage = <BotsPage />;
            break;
        default:
            var settingPage = <WebhooksPage />;
    }

    return (
        <Grid container direction="column" className={classes.root}>
            <CssBaseline />
            <Grid item className={classes.navbar}>
                <NavBar title={'Webbot Client Settings'} />
            </Grid>
            <Grid container item direction="row" className={classes.content}>

                <Hidden only={["xs", "sm"]}>
                <Grid item xs={false} md={3} lg={2} className={classes.selector}>
                    <SettingList/>
                </Grid>
                </Hidden>

                <Grid item xs={12} md={9} lg={10} className={classes.page}>
                    {settingPage}
                </Grid> 
            </Grid>
        </Grid>
    );

}

export default Setting;