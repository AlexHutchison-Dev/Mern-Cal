import React, { useContext } from "react";
import OrdinalSuffix from "./OrdinalSuffix";
import styled from "styled-components";
import { DateContext } from "../Contexts/DateContext";
import { getDay, getMonth } from "../Helpers/dateHelpers";

const DateStringWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 80vw;
  flex-shrink: -1;
  text-justify: center;
  /* margin-top: 30px; */
`;
const DateH2Subeading = styled.h2`
  font-size: 1rem !important;
  display: flex;
  align-items: center;
`;

const DateH2 = styled.h2`
  display: flex;
  font-size: 3rem;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 2.2rem;
  }
`;
function DateString(props) {
  const [globalState] = useContext(DateContext);
  const day = "";

  const date = props.date ? props.date : globalState.targetDate.$D;
  const month = getMonth(globalState.targetDate.$M);
  const year = globalState.targetDate.$y;

  function setDayString() {
    if (props.day === null) return "";
    return getDay(globalState.targetDate.$W);
  }
  //TODO This date string is a mess.
  setDayString();
  if (props.heading === "subheading") {
    return (
      <DateStringWrapper className="DateString">
        <DateH2Subeading>
          {`
          ${!day ? "Sunday" : day} 
          ${day}
        `}
          <OrdinalSuffix date={date} heading={props.heading} />
          {`${month} 
          ${year}`}
        </DateH2Subeading>
      </DateStringWrapper>
    );
  }

  return (
    <DateStringWrapper className="DateString">
      <DateH2>
        {`
        ${!day ? "Sunday" : day} 
        ${date}
      `}
        <OrdinalSuffix date={date} heading={props.heading} />
        {`${month} 
        ${year}`}
      </DateH2>
    </DateStringWrapper>
  );
}

export default DateString;
