import React, { useContext, useEffect } from "react";
import ModalBase from "./Modals/ModalBase";
import { DateContext } from "../Contexts/DateContext";
import styled from "styled-components";

import MonthView from "./MonthView";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 82px);
  width: 100%;
  align-items: center;
  padding: 0 2%;
`;
//TODO location for ModalContext.Provider
function Calendar() {
  const [dateContext] = useContext(DateContext);

  useEffect(() => {}, [dateContext.targetDate]);

  return (
    <Container className="Calendar">
      <MonthView />
      <ModalBase />
    </Container>
  );
}

export default Calendar;
