import React, { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { DateContext } from "../Contexts/DateContext";
import { getDay, getMonth, getOrdinalSuffix } from "../Helpers/dateHelpers";

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
  const [dateContext] = useContext(DateContext);

  var day = null;
  var date = null;
  var month = null;
  var year = null;
  const dateToFetch = `${dateContext.targetDate.$y}-${
    dateContext.targetDate.$M + 1
  }-${props.date ? props.date : dateContext.targetDate.$D}`;

  const dateString = fetchDate(dateToFetch, buildDateString);

  function fetchDate(date, callback) {
    const responce = dayjs(date);
    console.log(responce);
    return callback(responce);
  }

  function buildDateString(responce) {
    day = getDay(responce.$W);
    date = responce.$D;
    month = getMonth(responce.$M);
    year = responce.$y;

    return { 1: `${day} ${date}`, 2: ` ${month} ${year}` };
  }

  return (
    <DateStringWrapper className="DateString">
      {props.heading === "subheading" ? (
        <DateH2Subeading>
          {dateString[1]}
          <sup>{getOrdinalSuffix(date)}</sup>
          {dateString[2]}
        </DateH2Subeading>
      ) : (
        <DateH2>
          {dateString[1]}
          <sup>{getOrdinalSuffix(date)}</sup>
          {dateString[2]}
        </DateH2>
      )}
    </DateStringWrapper>
  );
}

export default DateString;
