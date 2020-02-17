import React from "react";
import NavBar from "./components/NavBar";
import Router from './components/Router';
import { useSelector, useDispatch } from "react-redux";
import Login from './pages/LoginForm';
import './css/navbar.css';

const App = props => {
  const isAuth = useSelector(state => state.authReducer.loggedIn);

  return (
    <React.Fragment>
      <NavBar />
      <div className = 'content'>
        {isAuth ? <Router /> : <Login />}
      </div>
    </React.Fragment>
  );
};

export default App;
