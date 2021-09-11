import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { DateContext } from "../Contexts/DateContext.js";
import { UserContext } from "../Contexts/UserContext.js";
import Hour from "./Hour";

const DayContainer = styled.div`
  height: 90%;
  width: 100%;
  margin: 2%;
  justify-content: center;
  overflow-y: auto;
  border: 1px solid #555;
`;

function DayView() {
  const hours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    "00",
  ];
  const [dateContext] = useContext(DateContext);
  const [userContext] = useContext(UserContext);
  var currentHour = dateContext.targetDate.$H;

  if (currentHour === 0) currentHour = "00";

  function centerCurrentHourInViewport(hour) {
    console.log(hour);
    document
      .getElementById(hour.toString())
      .scrollIntoView({ block: "center" });
  }
  // No user id redirect to login
  if (!userContext.user.id) {
    return <Redirect to={"/login"} />;
  }

  var events = userContext.user.events.filter((item) => {
    const day = dateContext.focusedDay;
    const month = dateContext.targetDate.$M;
    const year = dateContext.targetDate.$y;
    // TODO replace this with actual hour once model and controller are updated to store a time

    if (item.day === day && item.month === month && item.year === year) {
      return true;
    } else return null;
  });

  return (
    <DayContainer className="DayView" id="day-container">
      {hours.map((hour) => (
        <Hour
          key={hour}
          hour={hour}
          currentHour={currentHour}
          centerCurrentHourInViewport={centerCurrentHourInViewport}
          // TODO when hours added to events back end filter by hour;
          events={events}
        ></Hour>
      ))}
    </DayContainer>
  );
}

export default DayView;
