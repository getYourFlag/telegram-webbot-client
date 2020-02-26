import React from "react";
import NavBar from "./components/NavBar";
import Router from './components/Router';
import { useSelector, useDispatch } from "react-redux";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './pages/LoginForm';

const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
  navbar: {
    flexGrow: 0
  },
  content: {
    flexGrow: 1
  }
})

const App = props => {
  const isAuth = useSelector(state => state.authReducer.loggedIn);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={0} direction="column" className={classes.root}>
        <Grid item className={classes.navbar}>
          <NavBar />
        </Grid>
        <Grid item className={classes.content}>
          <Router />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
