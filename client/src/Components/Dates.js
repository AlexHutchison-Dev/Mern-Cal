import React from "react";
import styled from "styled-components";
import DateCardNull from "./DateCardNull";
import DateCard from "./DateCard";

const DatesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #555;

`;

function Dates(props) {
  return (
    <DatesContainer>
      {props.days.map((day, index) => {
        if (!day) {
          return <DateCardNull index={index} key={Math.random()} />;
        } else return <DateCard day={day} index={index} key={day} />;
      })}
    </DatesContainer>
  );
}

export default Dates;
