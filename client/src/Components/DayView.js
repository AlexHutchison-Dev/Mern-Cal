import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { DateContext } from "../Contexts/DateContext.js";
import { UserContext } from "../Contexts/UserContext.js";

const DayContainer = styled.div`
  height: 90%;
  width: 100%;
  margin: 2%;
  justify-content: center;
  overflow-y: auto;
  border: 1px solid #555;
`;

const Hour = styled.div`
  min-height: 150px;
  width: 95%;
  margin: auto;
  border: 1px solid #555;
`;

function DayView() {

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00"];

  const [dateContext] = useContext(DateContext);
  const [userContext,] = useContext(UserContext);
  var currentHour = dateContext.targetDate.$H;

  console.log(currentHour);
  if (currentHour === 0) currentHour = "00";
  useEffect(() => {
    // When loaded, focus view on current Hour;
    // const hourHeight = document.getElementById("00").style.height;

    if (currentHour) {
      document.getElementById(currentHour.toString()).scrollIntoView({ block: "center" });
    }
  }, [dateContext.targetDate, currentHour]);

  // No user id redirect to login
  if (!userContext.user.id) {
    return <Redirect to={"/login"} />;
  }

  // console.log(userContext.user);

  userContext.user.events.filter((item) => {
    // console.log(item);
  });

  return (
    <DayContainer className="DayView" id="day-container">
      {hours.map(hour => (
        <Hour key={hour} id={hour.toString()}>{hour + ":00"}</Hour>
      ))}
    </DayContainer>
  );
}


export default DayView;
