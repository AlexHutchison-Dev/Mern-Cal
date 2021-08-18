import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AddEvent from "./AddEvent";
import Event from "./Event";
import { DateContext } from "../Contexts/DateContext";
import { UserContext } from "../Contexts/UserContext";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const Day = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% / 7 - 0px);
  border: 1px solid #aaa;
  color: black;
  height: 115px;
  align-items: top;
  justify-content: space-between;
`;

const Today = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(43, 223, 43, 1);
`;

const H4 = styled.h4`
  margin: 1%;
`;

const DateBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const EventContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

function DateCard(props) {
  //TODO replace this state with css hover visibility due to lag
  const mobile = navigator.MaxTouchPoints > 0 ? true : false;
  const [hover, setHover] = useState(mobile);

  const [globalState] = useContext(DateContext);
  const [userContext] = useContext(UserContext);
  var todaysEvents = null;

  useEffect(() => {}, []);

  const todaysDate = {
    date: props.day,
    month: globalState.targetDate.$M,
    year: globalState.targetDate.$y,
  };

  function toggleHover() {
    if (!mobile) {
      setHover(!hover);
    }
  }

  if (userContext.user.events) {
    todaysEvents = userContext.user.events.filter(
      (event) =>
        event.day === todaysDate.date &&
        event.month === globalState.targetDate.$M &&
        event.year === globalState.targetDate.$y
    );
  }

  const dateInfo = (
    <Content>
      <DateBar>
        <H4>{props.day}</H4>
        {hover ? <AddEvent eventDate={todaysDate} /> : ""}
      </DateBar>

      <EventContainer>
        {todaysEvents &&
          todaysEvents.map((event, index) => {
            if (index < 1) {
              return <Event event={event} key={event._id} />;
            }
            if (index === 1) {
              const moreEvents = {
                title: `+ ${todaysEvents.length - 1} more...`,
              };
              return <Event event={moreEvents} key={event._id} />;
            } else return "";
          })}
      </EventContainer>
    </Content>
  );

  if (props.day === globalState.targetDate.$D) {
    return (
      //TODO need to look at event box styling
      <Day>
        <Today
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          key={props.day}
        >
          {dateInfo}
        </Today>
      </Day>
    );
  }

  return (
    <Day onMouseEnter={toggleHover} onMouseLeave={toggleHover} key={props.day}>
      {dateInfo}
    </Day>
  );
}

export default DateCard;
