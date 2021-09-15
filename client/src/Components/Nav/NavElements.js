import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 5px #555;
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  margin: auto;
  background-color: white;
  /* padding-top: 15px; */
`;

export const Logo = styled.a`
  font-size: 3rem !important;
  margin-left: 20px;
  color: #555;
  cursor: pointer;
`;

export const NavBtn = styled.button`
  margin: 0 10px 0 10px;
  background-color: white;
`;

export const CurrentYear = styled.h1`
  color: #555;
`;

export const AuthButtonContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
`;
