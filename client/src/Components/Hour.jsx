import React, { useEffect } from "react";
import styled from "styled-components";
import Event from "./Event";

const HourContainer = styled.div`
  min-height: 150px;
  width: 95%;
  margin: auto;
  border: 1px solid #555;
`;

const HourText = styled.h1`
  margin: 1%;
  position: relative;
  top: 0;
  left: 0;
`;

function Hour(props) {
  useEffect(() => {
    // When loaded, focus view on current Hour;
    if (props.currentHour === props.hour) {
      props.centerCurrentHourInViewport(props.hour);
    }
  }, [props]);

  return (
    <HourContainer>
      <HourText id={props.hour.toString()}>
        {props.hour.toString() + ":00"}
      </HourText>
      {props.events &&
        props.events.map((item) => {
          if (item.hour === props.hour) {
            return <Event event={item} key={item._id} />;
          }
          return "";
        })}
    </HourContainer>
  );
}

export default Hour;
