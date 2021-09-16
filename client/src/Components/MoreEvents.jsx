import React, { useContext } from "react";
import styled from "styled-components";
import { DateContext } from "../Contexts/DateContext";

const EventBox = styled.div`
  border: 1px solid #555;
  border-radius: 2px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 2px 3%;
  padding: 0 5%;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  font-size: 0.7em;
  font-weight: 100;
  margin: 1%;
`;

function Event(props) {
  const [, , setDay] = useContext(DateContext);

  function handleClick(event) {
    event.preventDefault();
    setDay(props.day);
  }

  return (
    <EventBox onClick={handleClick}>
      <Title>{props.event.title}</Title>
    </EventBox>
  );
}

export default Event;
