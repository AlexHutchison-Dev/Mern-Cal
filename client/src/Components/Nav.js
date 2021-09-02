import React, { useContext } from "react";
import MonthSelect from "./MonthSelect";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { DateContext } from "../Contexts/DateContext";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 5px #555;

`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  margin: auto;
  background-color: white;
  /* padding-top: 15px; */
`;

const Logo = styled.a`
  font-size: 3rem !important;
  margin-left: 20px;
  color: #555;
`;

const NavBtn = styled.button`
  margin: 0 10px 0 10px;
  background-color: white;
`;

const CurrentYear = styled.h1`
  color: #555;
`;

const AuthButtonContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
`;

function Nav() {
  const history = useHistory();
  const [userContext, changeUserContext] = useContext(UserContext);
  const [dateContext] = useContext(DateContext);

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
          <MonthSelect />
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
          {!userContext.user.id && (
            <NavBtn
              type="button"
              name="/register"
              className="btn btn-light"
              onClick={handleButtonBodyClick}
            >
              Sign Up
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
            <NavBtn
              type="button"
              className="btn btn-light"
              name="/"
              onClick={handleButtonBodyClick}
            >
              Log Out
            </NavBtn>
          )}
        </AuthButtonContainer>
      </NavBar>
    </NavContainer>
  );
}

export default Nav;
