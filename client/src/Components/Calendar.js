import React, {useContext, useEffect} from "react";
import ModalBase from "./Modals/ModalBase";
import {DateContext} from '../Contexts/DateContext'
import styled from "styled-components";

import CalendarData from "./CalendarData";

const Container = styled.div`
  height: calc(100vh - 82px);
  width: 100vw;
  margin: 0;
`;
//TODO location for ModalContext.Provider
function Calendar() {

  const [dateContext,] = useContext(DateContext);

  useEffect(() => {
  }, [dateContext.targetDate]);

  return (
    <Container className="container">
        <CalendarData />
        <ModalBase />
    </Container>
  );
}

export default Calendar;
