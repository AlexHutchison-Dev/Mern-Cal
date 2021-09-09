import React from "react";
import styled from "styled-components";
import { getDay } from "../Helpers/dateHelpers";

const WeekdaysContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 50px;
  color: #555;
`;

const DayLabels = styled.div`
  display: flex;
  word-wrap: wrap;
  width: calc(100% / 7);
  color: #555;
  height: 50px;
  align-items: center;
`;

const LabelText = styled.h3`
  @media (max-width: 1200px) {
    font-size: 1.25rem;
  }
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

function Weekdays(props) {
  return (
    <WeekdaysContainer className="Weekdays" id="weekdays">
      {getDay("list").map((weekday, index) => {
        return (
          <DayLabels key={Math.random()}>
            <LabelText>{weekday}</LabelText>
          </DayLabels>
        );
      })}
    </WeekdaysContainer>
  );
}
export default Weekdays;
