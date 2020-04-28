import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServerConfig, applyConfig, applyConfigFailed } from '../../actions/setting';

import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles({
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    titleIcon: {
        marginRight: '1rem',
        verticalAlign: 'center'
    },
});

const applyPrompt = (
    <Alert severity="info">
        Applying settings to server, please wait for a moment.
    </Alert>
);

const warnings = (
    <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Changing these settings could lead to complete disruption of service, check twice before applying the new settings!
    </Alert>
);

const Error = props => (
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {props.message}
    </Alert>
)

const Webhook = props => {
    const dispatch = useDispatch();
    const originalServerUrl = useSelector(state => state.settingReducer.serverUrl) || '';
    const error = useSelector(state => state.settingReducer.error);
    const applying = useSelector(state => state.settingReducer.applying);
    const [serverUrl, setServerUrl] = useState(originalServerUrl);
    const classes = useStyles();

    const submitDbSettings = _ => {
        const data = {serverUrl, dbUrl}
        console.log(data);
        dispatch(applyConfigFailed("Config change has failed successfully."))
    }

    let alertPrompt = error ? <Error message={error} /> : warnings;

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4" className={classes.title}>
                    <LanguageIcon color="primary" fontSize="large" className={classes.titleIcon} />
                    Webhooks
                </Typography>
            </Grid>
            <Grid item>
                {alertPrompt}
            </Grid>
            <Grid item container direction="row" alignItems="center" justify="flex-start">
                <Grid item xs={4} sm={3} lg={2}>
                    <Typography variant="body1">Server URL</Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <TextField name="server_url" variant="outlined" fullWidth onChange={e => setServerUrl(e.target.value)} value={serverUrl}/>
                </Grid>
            </Grid>
            <Grid item container direction="row" alignItems="center" justify="flex-start">
                <Grid item xs={4} sm={3} lg={2}>
                    <Typography variant="body1">Reset Webhooks</Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <Button variant="contained" color="secondary">Reset</Button>
                </Grid>
            </Grid>
            <Grid item container direction="row" alignItems="center" justify="center">
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={submitDbSettings}>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Webhook;