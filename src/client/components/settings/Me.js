import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

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

const Me = props => {
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4" className={classes.title}>
                    <PersonIcon color="primary" fontSize="large" className={classes.titleIcon} />
                    My Account
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Me;