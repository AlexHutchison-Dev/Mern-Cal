import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";
import { getMonth } from "../Helpers/dateHelpers";

const MonthSelectContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 3rem 0 -1.5rem 0;
`;

const MonthButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CurrentMonth = styled.h2`
  margin: 0 2rem;
  width: 175px;
`;

function MonthSelect() {
  const [globalState, changeGlobalState] = useContext(GlobalState);

  function handlePrevious() {
    changeGlobalState("monthOffset", "subtract");
  }

  function handleNext() {
    changeGlobalState("monthOffset", "add");
  }
  return (
    <MonthSelectContainer>
      <MonthButton
        type="button"
        className="btn btn-primary"
        onClick={handlePrevious}
      >
        Prev
      </MonthButton>
      <CurrentMonth>{getMonth(globalState.targetDate.$M)}</CurrentMonth>
      <MonthButton
        type="button"
        className="btn btn-primary"
        onClick={handleNext}
      >
        Next
      </MonthButton>
    </MonthSelectContainer>
  );
}

export default MonthSelect;
