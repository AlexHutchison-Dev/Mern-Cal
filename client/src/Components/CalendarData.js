import React, { useContext, useEffect } from "react";
import { monthStartDay, getDaysInMonth } from "../Helpers/dateHelpers";
import { Redirect } from "react-router-dom";
import { DateContext } from "../Contexts/DateContext";
import { UserContext } from "../Contexts/UserContext";
import styled from "styled-components";
import DateString from "./DateString";
import MonthSelect from "./MonthSelect";
import Weekdays from "./Weekdays";
import Dates from "./Dates";

const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100%;
  

  /* text-align: center;
  @media (max-width: 1000px) {
    width: 100vw;
  } */
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: 90%; */
  border: 2px solid #555;
  border-radius: 4px;
  /* margin: 50px 0; */
  /* @media (max-width: 800px) {
    width: 99%;
  } */
`;

function CalendarData() {
  const [dateContext] = useContext(DateContext);
  const [userContext, ] = useContext(UserContext);
  

  useEffect(() => {
    console.log("use effect called due to change to events array");
  }, []);

  // No user id redirect to login
  if (!userContext.user.id) {
    return <Redirect to={"/login"} />;
  }

  function makeDaysArray() {
    const daysInMonth = getDaysInMonth(dateContext.targetDate);

    const days = [];

    if (monthStartDay(dateContext.targetDate) !== 0) {
      for (let i = 0; i < monthStartDay(dateContext.targetDate); i++) {
        days.push(null);
      }
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return (
      <CalendarContainer>
        <CalendarWrapper>
          <Weekdays />
          <Dates days={days} />
        </CalendarWrapper>
      </CalendarContainer>
    );
  }

  return <div>{makeDaysArray(dateContext.targetDate)}</div>;
}

export default CalendarData;
