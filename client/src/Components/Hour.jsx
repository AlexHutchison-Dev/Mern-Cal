import React, { useEffect } from "react";
import styled from "styled-components";

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
    </HourContainer>
  );
}

export default Hour;
