import React, { useContext, useEffect } from "react";
import ModalBase from "./Modals/ModalBase";
import { DateContext } from "../Contexts/DateContext";
import styled from "styled-components";

import MonthView from "./MonthView";

const Container = styled.div`
  height: calc(100vh - 82px);
  width: 100vw;
`;
//TODO location for ModalContext.Provider
function Calendar() {
  const [dateContext] = useContext(DateContext);

  useEffect(() => {}, [dateContext.targetDate]);

  return (
    <Container>
      <MonthView />
      <ModalBase />
    </Container>
  );
}

export default Calendar;
