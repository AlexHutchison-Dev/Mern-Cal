import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AddEvent from "./AddEvent";
import Event from "./Event";
import { GlobalState } from "../Contexts/GlobalState";
import { UserContext } from "../Contexts/UserContext";

const Day = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% / 7 - 0px);
  border: 1px solid #555;
  color: black;
  height: 115px;
  align-items: top;
  justify-content: space-between;
`;

const Today = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% / 7 - 0px);
  border: 1px solid #555;
  font-weight: bold;
  color: white;
  font-size: 1.7rem;
  background-color: rgba(43, 223, 43, 0.87) !important;
  height: 115px;
  align-items: top;
  justify-content: space-between;
`;
const EvenDay = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: calc(100% / 7 - 0px);
  border: 1px solid #555;
  color: black;
  height: 115px;
  align-items: top;
  background-color: rgba(46, 161, 255, 0.486);
  justify-content: space-between;
`;
const H4 = styled.h4`
  margin: 0;
`;

const DateBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const EventContainer = styled.div`
  width: 100%;
`;

function DateCard(props) {
  //TODO replace this state with css hover visibility due to lag
  const [hover, setHover] = useState(false);

  const [globalState] = useContext(GlobalState);
  const [userContext] = useContext(UserContext);
  var todaysEvents = null;

  useEffect(() => {}, []);

  const todaysDate = {
    date: props.day,
    month: globalState.targetDate.$M,
    year: globalState.targetDate.$y,
  };

  function toggleHover() {
    setHover(!hover);
  }

  if (userContext.user.events) {
    todaysEvents = userContext.user.events.filter(
      (event) =>
        event.day === todaysDate.date &&
        event.month === globalState.targetDate.$M &&
        event.year === globalState.targetDate.$y
    );
  }
  if (props.day === globalState.targetDate.$D) {
    return (
      //TODO need to look at event box styling
      <Today
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        key={props.day}
      >
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
      </Today>
    );
  }

  //TODO major DRY violation need to sort this
  if (props.index % 2 !== 0) {
    return (
      <EvenDay
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        key={props.day}
      >
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
      </EvenDay>
    );
  }

  return (
    <Day onMouseEnter={toggleHover} onMouseLeave={toggleHover} key={props.day}>
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
    </Day>
  );
}

export default DateCard;
