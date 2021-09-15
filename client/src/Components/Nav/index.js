import React, { useContext, useEffect } from "react";
import DateSelect from "./DateSelect";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { DateContext } from "../../Contexts/DateContext";
import {
  NavContainer,
  NavBar,
  Logo,
  NavBtn,
  CurrentYear,
  AuthButtonContainer,
} from "./NavElements.js";

function Nav(props) {
  const history = useHistory();
  const [userContext, changeUserContext] = useContext(UserContext);
  const [dateContext] = useContext(DateContext);

  useEffect(() => {}, [userContext.user.id]);

  function handleButtonBodyClick(event) {
    console.log("handleButtonBodyClick called " + event.target.name);
    if (event.target.name === "/") {
      changeUserContext.logOut();
      changeUserContext.clearEventStore();
    }
    history.push(event.target.name);
  }

  return (
    <NavContainer className="NavBar">
      <NavBar>
        {userContext.user.id ? (
          <DateSelect dayView={props.dayView} />
        ) : (
          <Logo
            className="navbar-brand"
            name="/"
            id="logo"
            onClick={handleButtonBodyClick}
          >
            Calendar
          </Logo>
        )}
        {userContext.user.id && (
          <CurrentYear>{dateContext.targetDate.$y}</CurrentYear>
        )}
        <AuthButtonContainer>
          {!userContext.user.id ? (
            <NavBtn
              type="button"
              name="/register"
              className="btn btn-light"
              onClick={handleButtonBodyClick}
            >
              Sign Up
            </NavBtn>
          ) : (
            <NavBtn className="btn btn-light" onClick={props.toggleDayView}>
              {props.dayView ? "Month View" : "Day View"}
            </NavBtn>
          )}

          {userContext.user.id === "" ? (
            <NavBtn
              type="button"
              className="btn btn-light"
              name="/login"
              onClick={handleButtonBodyClick}
            >
              Log In
            </NavBtn>
          ) : (
            <div>
              <NavBtn
                type="button"
                className="btn btn-light"
                name="/"
                onClick={handleButtonBodyClick}
              >
                Log Out
              </NavBtn>
            </div>
          )}
        </AuthButtonContainer>
      </NavBar>
    </NavContainer>
  );
}

export default Nav;
