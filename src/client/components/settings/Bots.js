import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';
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
    const bots = useSelector(state => state.botReducer.list);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4" className={classes.title}>
                    <AndroidIcon color="primary" fontSize="large" className={classes.titleIcon} />
                    Bots
                </Typography>
            </Grid>
            <Grid item container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="subtitle1" align="center">
                        Current Available Bots
                    </Typography>
                </Grid>
                <Grid item container direction="row">
                    <Grid item xs={9}>
                        <Typography variant="subtitle1" align="center">
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1" align="center">
                            Actions
                        </Typography>
                    </Grid>
                </Grid>
                {bots.map(bot => {
                    <Grid item container direction="row" key={bot._id}>
                        <Grid item xs={9}>
                            <Typography>
                                {bot.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>
                                Button
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {bot.description}
                            </Typography>
                        </Grid>
                    </Grid>
                })}
            </Grid>
        </Grid>
    )
}

export default Bots;