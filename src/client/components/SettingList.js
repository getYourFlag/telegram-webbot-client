import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import AndroidIcon from '@material-ui/icons/Android';
import PersonIcon from '@material-ui/icons/Person';

const SettingList = props => {
    return (
        <List>
            <ListSubheader>Settings</ListSubheader>
            <ListItem button component={Link} to={'/settings/webhooks'}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Webhooks" />
            </ListItem>
            <ListItem button component={Link} to={'/settings/bots'}>
                <ListItemIcon>
                    <AndroidIcon />
                </ListItemIcon>
                <ListItemText primary="Bots" />
            </ListItem>
            <ListItem button component={Link} to={'/settings/me'}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
            </ListItem>
        </List>
    )
}

export default SettingList;