import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AndroidIcon from '@material-ui/icons/Android';
import LanguageIcon from '@material-ui/icons/Language';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from "../actions/chat";
import { Link } from 'react-router-dom';
import SettingList from './SettingList';

const useStyles = makeStyles({
    drawer: {
        width: '250px'
    }
});

const SideDrawer = props => {
    const bots = useSelector(state => state.botReducer.list) || [];
    const classes = useStyles();
    const dispatch = useDispatch();

    let variant = props.variant || 'temporary';

    let botList = (
        <React.Fragment>
        <List>
            <ListSubheader>Registered Bots</ListSubheader>
            {bots.map(bot => (
                <ListItem button key={bot._id} onClick={_ => dispatch(fetchChats(bot))} component={Link} to={'/'}>
                    <ListItemIcon>
                        <AndroidIcon />
                    </ListItemIcon>
                    <ListItemText primary={bot.name} />
                </ListItem>
            ))}
        </List>
        <Divider />
        </React.Fragment>
    );
    if (props.showBotList === false) botList = null;

    return (
        <Drawer anchor="left" open={props.open} onClick={props.close} variant={variant}>
            <div className={classes.drawer}>
                { botList }
                <SettingList />
            </div>
        </Drawer>
    );

}

export default SideDrawer;