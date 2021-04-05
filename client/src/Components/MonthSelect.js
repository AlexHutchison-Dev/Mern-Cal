import React, { useContext } from "react";
import styled from "styled-components";
import { DateContext } from "../Contexts/DateContext";
import { getMonth } from "../Helpers/dateHelpers";

const MonthSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
`;

const MonthButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 0 10px;
`;

const CurrentMonth = styled.h3`
  display: flex;
  width: 175px;
`;

function MonthSelect() {
  const [globalState, changeMonthOffset] = useContext(DateContext);

  function handlePrevious() {
    changeMonthOffset("subtract");
  }

  function handleNext() {
    changeMonthOffset("add");
  }
  return (
    <MonthSelectContainer>
      <MonthButton type="button" className="btn" onClick={handlePrevious}>
        Prev
      </MonthButton>
      <CurrentMonth>{getMonth(globalState.targetDate.$M)}</CurrentMonth>
      <MonthButton type="button" className="btn" onClick={handleNext}>
        Next
      </MonthButton>
    </MonthSelectContainer>
  );
}

export default MonthSelect;
