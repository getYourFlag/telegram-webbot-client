import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Router from './components/Router';
import ContentWrapper from "./components/ContentWrapper"

const App = props => {
  return (
    <React.Fragment>
      <NavBar />
      <ContentWrapper>
        <Router />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default App;
