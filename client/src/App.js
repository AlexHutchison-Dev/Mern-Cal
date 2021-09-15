import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "./Contexts/UserContext";
import { ModalContextProvider } from "./Contexts/ModalContext";
import { DateProvider } from "./Contexts/DateContext";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import Calendar from "./Components/Calendar";
import Nav from "./Components/Nav/index.js";
import Home from "./Components/Home/index";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
library.add(fab);

const AppContainer = styled.div``;
function App() {
  const [dayView, setDayView] = useState(false);

  function toggleDayView() {
    setDayView(!dayView);
  }
  return (
    <Router>
      <ModalContextProvider>
        <UserContextProvider>
          <DateProvider>
            <AppContainer className="App">
              <Nav toggleDayView={toggleDayView} dayView={dayView} />
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
                  <Calendar dayView={dayView} />
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
