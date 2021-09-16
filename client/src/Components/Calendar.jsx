import React, { useContext, useEffect } from "react";
import ModalBase from "./Modals/ModalBase";
import { DateContext } from "../Contexts/DateContext";
import styled from "styled-components";
import MonthView from "./MonthView";
import DayView from "./DayView";

const Container = styled.div`
  display: flex;
  margin-top: 5%;
  height: calc(100vh - 82px);
  width: 100%;
  padding: 0 2%;
  align-items: flex-start;
`;

function Calendar({ dayView, toggleDayView }) {
  const [dateContext, , setDay] = useContext(DateContext);
  const targetDate = dateContext.targetDate.$D;
  console.log("Calendar dayView: ", dayView);

  useEffect(() => {
    setDay(targetDate);
  }, [dateContext.targetDate]);

  return (
    <Container className="Calendar" id="calendar">
      {dayView ? <DayView /> : <MonthView toggleDayView={toggleDayView} />}
      <ModalBase />
    </Container>
  );
}

export default Calendar;
