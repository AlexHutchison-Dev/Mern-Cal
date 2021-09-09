import React from "react";
import styled from "styled-components";
import DateCardNull from "./DateCardNull";
import DateCard from "./DateCard";
import Weekdays from "./Weekdays";

const DatesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: 90%;
  width: 100%;
  border: 1px solid #555;
`;

function Dates(props) {
  console.log(`props.weeks in DAtes: ${props.weeks}`);
  return (
    <DatesContainer>
      {props.days.map((day, index) => {
        return (
          <DateCard
            day={day}
            index={index}
            key={day ? day : Math.random()}
            weeks={props.weeks}
            null={day ? false : true}
          />
        );
      })}
    </DatesContainer>
  );
}

export default Dates;
