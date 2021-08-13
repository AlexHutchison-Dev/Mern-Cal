import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "./Contexts/UserContext";
import { ModalContextProvider } from "./Contexts/ModalContext";
import { DateProvider } from "./Contexts/DateContext";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import Calendar from "./Components/Calendar";
import Nav from "./Components/Nav";
import Home from "./Components/Home/index";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
library.add(fab);

const AppContainer = styled.div`
  /* margin-top: 82px; */
`;
function App() {
  return (
    <Router>
      <ModalContextProvider>
        <UserContextProvider>
          <DateProvider>
            <AppContainer className="App">
              <Nav />
              {/* Router Switch */}
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <LogIn />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/cal">
                  <Calendar />
                </Route>
              </Switch>
            </AppContainer>
          </DateProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </Router>
  );
}

export default App;
