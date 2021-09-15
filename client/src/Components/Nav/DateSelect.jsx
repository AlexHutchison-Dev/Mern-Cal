import React, { useContext } from "react";
import styled from "styled-components";
import { DateContext } from "../../Contexts/DateContext";
import { getMonth, getOrdinalSuffix } from "../../Helpers/dateHelpers";

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
  margin: 0 5px;
`;

function MonthSelect(props) {
  const [dateContext, changeMonthOffset, setDay] = useContext(DateContext);
  const focusedDay = dateContext.focusedDay;
  const ordinalSuffix = <sup> {getOrdinalSuffix(focusedDay)}</sup>;

  function handlePrevious() {
    if (props.dayView) {
      return changeFocusedDay("subtract");
    }
    changeMonthOffset("subtract");
  }

  function handleNext() {
    if (props.dayView) {
      return changeFocusedDay("add");
    }
    changeMonthOffset("add");
  }

  function handleToday() {
    console.log("handle today");
    changeMonthOffset(0);
  }

  function changeFocusedDay(change) {
    change === "add" ? setDay(focusedDay + 1) : setDay(focusedDay - 1);
  }
  return (
    <MonthSelectContainer>
      <MonthButton
        type="button"
        className="btn btn-light"
        onClick={handlePrevious}
      >
        &lt;
      </MonthButton>
      <TodayButton
        type="button"
        className="btn btn-light"
        onClick={handleToday}
      >
        Today
      </TodayButton>
      <MonthButton type="button" className="btn btn-light" onClick={handleNext}>
        &gt;
      </MonthButton>
      <CurrentMonth>{getMonth(dateContext.targetDate.$M)} </CurrentMonth>
      {props.dayView && <CurrentMonth>{focusedDay} </CurrentMonth>}
      {props.dayView && <h4>{ordinalSuffix}</h4>}
    </MonthSelectContainer>
  );
}

export default MonthSelect;
