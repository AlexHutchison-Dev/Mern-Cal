import React from "react";
import ModalBase from "./Modals/ModalBase";
import styled from "styled-components";

import CalendarData from "./CalendarData";

const Container = styled.div`
height: calc(100vh - 82px);
width: 100vw;
margin: 0;

`;

function Calendar() {
  return (
    <Container className="container">
      <CalendarData />
      <ModalBase />
    </Container>
  );
}

export default Calendar;
