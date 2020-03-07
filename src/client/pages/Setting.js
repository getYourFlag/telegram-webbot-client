import React from 'react';
import { Grid, List, ListItem, ListItemText, ListItemIcon, CssBaseline, Drawer } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/NavBar';
import SettingList from '../components/SettingList';

const Setting = props => {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex'
        },
        menu: {
            zIndex: 0
        },
        drawer: {
            display: "flex",
            width: "auto"
        },
        toolbar: theme.mixins.toolbar
    }));
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="stretch">
            <CssBaseline />
            <Grid item>
                <NavBar title={'Webbot Client Settings'} position="fixed" />
            </Grid>
            <Grid container item direction="row">
                <Grid item xs={12} md={3} lg={2} className={classes.menu}>
                    <Drawer variant="permanent" className={classes.drawer}>
                        <div className={classes.toolbar} />
                        <SettingList />
                    </Drawer>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default Setting;