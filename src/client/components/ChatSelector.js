import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const ChatSelector = props => {
  const classes = makeStyles(theme => ({
    inline: {
      display: "inline",
      float: "right"
    },
    title: {
      fontWeight: 600,
      fontSize: "1.1rem"
    },
    text: {
      fontSize: "0.8rem",
      display: "box",
      boxOrient: "vertical",
      lineClamp: 2,
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  }))();

  return (
    <ListItem
      button
      divider
      onClick={props.getMessages}
      alignItems="flex-start"
    >
      <ListItemText
        primary={
          <React.Fragment>
            <span className={classes.title}>{props.title}</span>
            <Typography
              component="span"
              variant="caption"
              className={classes.inline}
              color="textSecondary"
            >
              {props.date}
            </Typography>
          </React.Fragment>
        }
        secondary={props.dialog}
        secondaryTypographyProps={{
          variant: "body1",
          color: "textPrimary",
          className: classes.text
        }}
      />
    </ListItem>
  );
};

export default ChatSelector;
