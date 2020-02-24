import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const ChatSelector = props => {
    const classes = makeStyles(theme => ({
        inline: {
            display: 'inline',
            float: 'right'
        }
    }))();

    return (
    <ListItem button divider onClick={props.getMessages} alignItems='flex-start'>
        <ListItemText primary={
            <React.Fragment>
                <b>{props.title}</b>
                <Typography component='span' variant='caption' 
                    className={classes.inline} color='textSecondary'>
                    {props.date}
                </Typography>
            </React.Fragment>
        } secondary={props.dialog} secondaryTypographyProps={{
            color: 'textPrimary',
            variant: 'body1'
        }}/>
    </ListItem>
)};

export default ChatSelector;