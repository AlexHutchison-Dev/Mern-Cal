import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";


const AddEventBtn = styled.button`
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  border: none;
  background-color: rgba(148, 148, 148, 0);
`;

function AddEvent(props) {
  const [, changeGlobalState] = useContext(GlobalState);

  function handleClick() {
    changeGlobalState("event", {...props.eventDate}, () => {
      changeGlobalState("modal", "addevent");
      changeGlobalState("modalVisibility");
    });
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
