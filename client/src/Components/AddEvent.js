import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../Contexts/ModalContext";
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
  const [, changeUserContext] = useContext(UserContext);
  const [, changeModalContext] = useContext(ModalContext);

  function handleClick() {
    changeUserContext.eventStore({...props.eventDate}, () => {
      changeModalContext.eventStore.modalType("addevent");
      changeModalContext.toggleVisibility();
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
