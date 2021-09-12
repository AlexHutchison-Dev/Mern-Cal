import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AddEvent from "./AddEvent";
import Event from "./Event";
import { DateContext } from "../Contexts/DateContext";
import { UserContext } from "../Contexts/UserContext";

const Day = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% / 7 - 0px);
  height: calc(100% / ${(props) => props.weeks});
  border: 1px solid
    ${(props) => (props.today ? "rgba(43, 223, 43, 1)" : "#aaa")};
  color: black;
  align-items: top;
  justify-content: space - between;
  background-color: ${(props) => props.null && "rgba(108, 178, 213, 0.15) "};
`;

const H4 = styled.h4`
  margin: 1%;
  font-size: 1.5rem;
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

  const [dateContext, , setDay] = useContext(DateContext);
  const [userContext] = useContext(UserContext);
  var todaysEvents = null;

  alert(`mobile: ${mobile}`);
  useEffect(() => {}, [mobile]);

  const todaysDate = {
    date: props.day,
    month: dateContext.targetDate.$M,
    year: dateContext.targetDate.$y,
  };

  function toggleHover() {
    if (!mobile) {
      setHover(!hover);
    }
  }

  function handleClick(event) {
    event.preventDefault();
    setDay(props.day);
    console.log(
      `setDay to: ${dateContext.focusedDay}, props.day: ${props.day}`
    );
  }
  if (userContext.user.events) {
    todaysEvents = userContext.user.events.filter(
      (event) =>
        event.day === todaysDate.date &&
        event.month === dateContext.targetDate.$M &&
        event.year === dateContext.targetDate.$y
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
  return (
    <Day
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      weeks={props.weeks}
      today={props.day === dateContext.targetDate.$D ? true : false}
      null={props.null}
      onClick={handleClick}
    >
      {!props.null && dateInfo}
    </Day>
  );
}

export default DateCard;
