import React, {useContext} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {UserContext} from "../Contexts/UserContext";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  /* padding-top: 15px; */

`;

const Logo = styled.a`
  font-size: 3rem !important;
  margin-left: 20px;
  color: white !important;
  text-shadow: 2px 2px 2px #555;
`;

const NavBtn = styled.button`
  margin: 0 10px 0 10px;
`;

function Nav() {
  const history = useHistory();
  const [userContext, changeUserContext] = useContext(UserContext)
  
  function handleButtonBodyClick(event) {
    console.log("handleButtonBodyClick called " + event.target.name);
    if (event.target.name === "/") {
      changeUserContext.logOut();
      changeUserContext.clearEventStore();
    }
    history.push(event.target.name);
  }

  return (
    <NavContainer>
      <NavBar className="fixed-top navbar-dark bg-primary">
        <Logo
          className="navbar-brand"
          name="/"
          id="logo"
          onClick={handleButtonBodyClick}
        >
          Calendar
        </Logo>
        <div>
          {!userContext.user.id && <NavBtn
            type="button"
            name="/register"
            className="btn btn-light"
            onClick={handleButtonBodyClick}
          >
            Sign Up
          </NavBtn>}

          {userContext.user.id === "" ? <NavBtn
            type="button"
            className="btn btn-light"
            name="/login"
            onClick={handleButtonBodyClick}
          >
            Log In
          </NavBtn> : <NavBtn
            type="button"
            className="btn btn-light"
            name="/"
            onClick={handleButtonBodyClick}
          >
            Log Out
          </NavBtn>}
        </div>
      </NavBar>
    </NavContainer>
  );
}

export default Nav;
