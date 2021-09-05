import React, { useContext, useEffect } from "react";
import ModalBase from "./Modals/ModalBase";
import { DateContext } from "../Contexts/DateContext";
import styled from "styled-components";

import DayView from "./DayView";

const Container = styled.div`
  display: flex;
  align-items: center;
  // margin-top: 10%;
  height: calc(100vh - 82px);
  width: 100%;
  padding: 0 2%;
`;

function Calendar() {
  const [dateContext] = useContext(DateContext);

  useEffect(() => { }, [dateContext.targetDate]);

  return (
    <Container className="Calendar">
      <DayView />
      <ModalBase />
    </Container>
  );
}

export default Calendar;
