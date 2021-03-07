import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";
import {useEvent} from "./hooks/EventHook";

const AddEventBtn = styled.button`
  /* display: flex; */
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  border: none;
  background-color: rgba(148, 148, 148, 0);
`;

function AddEvent(props) {
  const [, changeGlobalState] = useContext(GlobalState);
  const [, handleEventDateChange, ,] = useEvent();

  console.log(props.eventDate)
  function handleClick() {
    handleEventDateChange(props.eventDate);
    changeGlobalState("modalVisibility");
  }
  return (
    <div>
      <AddEventBtn className="" onClick={handleClick}>
        +
      </AddEventBtn>
    </div>
  );
}

export default AddEvent;
