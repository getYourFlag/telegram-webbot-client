import React, { useState, useEffect } from "react";
import axios from "./helpers/axios";
import NavBar from "./components/NavBar";
import LoginForm from "./components/Login";
import ContentWrapper from "./components/ContentWrapper"

const App = props => {
  const [display, setDisplay] = useState("Hello World!");
  useEffect(() => {
    document.title = "Hello World!";
    axios.get("/").then(res => setDisplay(res.data));
  });

  return (
    <React.Fragment>
      <NavBar />
      <ContentWrapper>
        <LoginForm />
      </ContentWrapper>
    </React.Fragment>
  );
};

export default App;
