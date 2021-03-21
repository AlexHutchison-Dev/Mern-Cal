import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";
import { UserContext } from "../Contexts/UserContext";


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
  const [, changeUserContext] = useContext(UserContext);

  function handleClick() {
    changeUserContext.eventStore({...props.eventDate}, () => {
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
