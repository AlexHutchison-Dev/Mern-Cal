import React, { useContext, useEffect } from "react";
import { monthStartDay, getDaysInMonth } from "../Helpers/dateHelpers";
import { Redirect } from "react-router-dom";
import { DateContext } from "../Contexts/DateContext";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import DateString from "./DateString";
import MonthSelect from "./MonthSelect";
import Weekdays from "./Weekdays";
import Dates from "./Dates";

const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  max-width: 1200px;

  text-align: center;
  @media (max-width: 1000px) {
    width: 100vw;
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  border: 2px solid #555;
  border-radius: 4px;
  margin: 50px 0;
  @media (max-width: 800px) {
    width: 99%;
  }
`;

function CalendarData() {
  const [dateContext] = useContext(DateContext);
  const [userContext, changeUserContext] = useContext(UserContext);
  // fetch events from server when user updates
  const userId = userContext.user.id;

    // getEvents(userId, dateContext.targetDate.$M, pushEventsToUserState);
    
    function pushEventsToUserState(events) {
      changeUserContext.updateUserEvents(events);
    }
  

  useEffect(() => {
    console.log("use effect called due to change to events array");
  }, []);

  // No user id redirect to login
  if (!userContext.user.id) {
    return <Redirect to={"/login"} />;
  }

  // function getEvents(id, month, callback) {
  //   console.log(month);
  //   if (!id) return console.error("no user id provided to retrieve events");
  //   axios
  //     .post("http://localhost:8000/cal", {
  //       id: id,
  //     })
  //     .then((responce) => {
  //       const events = responce.data.events;
  //       callback(events);
  //     })

  //     .catch((err) => console.log(err));
  // }

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
        <DateString />
        <MonthSelect />
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
