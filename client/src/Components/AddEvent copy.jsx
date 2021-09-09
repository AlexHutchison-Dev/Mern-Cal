import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../Contexts/ModalContext";
import { useEvent } from "./hooks/EventHook";

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
  const [, changeModalContext] = useContext(ModalContext);
  const [, handleEventDateChange, ,] = useEvent();

  console.log(props.eventDate);
  function handleClick() {
    handleEventDateChange(props.eventDate);
    changeModalContext.toggleVisibility();
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
