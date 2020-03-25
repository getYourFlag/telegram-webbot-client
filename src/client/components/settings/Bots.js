import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AndroidIcon from '@material-ui/icons/Android';

const useStyles = makeStyles({
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    titleIcon: {
        marginRight: '1rem',
        verticalAlign: 'center'
    }
});

const Bots = props => {
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4" className={classes.title}>
                    <AndroidIcon color="primary" fontSize="large" className={classes.titleIcon} />
                    Bots
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Bots;