import React, { useContext } from "react";
import styled from "styled-components";
import { DateContext } from "../Contexts/DateContext";
import { getMonth } from "../Helpers/dateHelpers";


const MonthSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const MonthButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 0 10px;
  background-color: white;
`;

const TodayButton = styled.button`
  margin: 0 10px 0 10px;
  background-color: white;
`;

const CurrentMonth = styled.h3`
  display: flex;
  width: 175px;
  color: #555;
`;

function MonthSelect() {
  const [globalState, changeMonthOffset] = useContext(DateContext);

  function handlePrevious() {
    changeMonthOffset("subtract");
  }

  function handleNext() {
    changeMonthOffset("add");
  }

  function handleToday() {
    console.log("handle today")
    changeMonthOffset(0);
  }
  return (
    <MonthSelectContainer>
      <MonthButton type="button" className="btn btn-light" onClick={handlePrevious}>
        &lt;
      </MonthButton>
      <TodayButton type="button" className="btn btn-light" onClick={handleToday}>Today</TodayButton>      
      <MonthButton type="button" className="btn btn-light" onClick={handleNext}>
        &gt;
      </MonthButton>
      <CurrentMonth>{getMonth(globalState.targetDate.$M)}</CurrentMonth>
    </MonthSelectContainer>
  );
}

export default MonthSelect;
