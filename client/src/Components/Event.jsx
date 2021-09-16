import React, { useContext } from "react";
import styled from "styled-components";
import { deleteEvent } from "../Helpers/httpHelper";
import { ModalContext } from "../Contexts/ModalContext";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EventBox = styled.div`
  border: 1px solid #555;
  border-radius: 2px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 2px 3%;
  padding: 0 5%;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  font-size: 0.7em;
  font-weight: 100;
  margin: 1%;
`;
const TrashIcon = styled.p`
  height: 80%;
  margin: 0;
  cursor: pointer;
  color: #555;
  &:hover {
    color: red;
  }
`;

//TODO need to duplicate with out trash can for 2 more...  that opens aa day view

function Event(props) {
  const [, changeModalContext] = useContext(ModalContext);
  const [userContext, changeUserContext] = useContext(UserContext);

  function handleEventClick(event) {
    event.stopPropagation();
    changeUserContext.eventStore({ ...props.event }, () => {
      changeModalContext.modalType("event");
      changeModalContext.toggleVisibility();
    });
  }

  function handleDeleteClick() {
    deleteEvent(userContext.user.id, props.event._id, (responce) => {
      if (responce.data.success) {
        changeUserContext.clearEventStore();
        changeUserContext.updateUserEvents(responce.data.events);
      }
    });
  }

  function manageEventName() {
    if (props.event.title.length > 8) {
      return props.event.title.slice(0, 8) + "...";
    }
    return props.event.title;
  }

  return (
    <EventBox>
      <Title onClick={handleEventClick}>{manageEventName()}</Title>
      <TrashIcon onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} size="xs" />
      </TrashIcon>
    </EventBox>
  );
}

export default Event;
