import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';

const SettingList = props => {
    return (
        <List>
            {!props.showHeader ? <ListSubheader>Settings</ListSubheader> : null}
            <ListItem button component={Link} to={'/settings'}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Webhooks" />
            </ListItem>
        </List>
    )
}

export default SettingList;