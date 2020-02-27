import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../actions/auth";
import { Redirect } from "react-router-dom";
import { Grid, Box, TextField, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import errorMessages from "../../../config/errors.json";

const useStyles = makeStyles({
  root: {
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loginForm: {
    height: "auto",
    padding: "1rem",
    border: "1px solid",
    borderColor: "gray",
    borderRadius: "0.5rem",
    fontFamily: ['"Roboto"', "sans-serif"],

    display: "flex",
    flexDirection: "column"
  },
  fields: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1rem"
  },
  button: {
    width: "5rem",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuthed = useSelector(state => state.authReducer.loggedIn);
  const error = useSelector(state => state.authReducer.error);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (isAuthed) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={11} md={9} lg={7} className={classes.loginForm}>
        <Typography
          variant="h4"
          align="center"
          display="block"
          gutterBottom={true}
        >
          Webbot Client Login
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          label="Username"
          margin="normal"
          className={classes.fields}
        />
        <TextField
          variant="outlined"
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          label="Password"
          margin="normal"
          className={classes.fields}
        />
        {error ? (
          <Alert severity="error" className={classes.fields}>
            {errorMessages.auth[error.code]}
          </Alert>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={_ => dispatch(auth(username, password))}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
