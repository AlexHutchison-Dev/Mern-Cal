import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



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
 height:80%;
  margin: 0;
  cursor: pointer;
  color: #555;
  &:hover{
    color: red;
  }
`;

function Event(props) {
  const [globalState, changeGlobalState] = useContext(GlobalState);

  function handleEventClick(e) {
    changeGlobalState("event", props.event, () => {
      changeGlobalState("modal", "event");
      changeGlobalState("modalVisibility");
    });
  }

  function handleDeleteClick() {
    
    console.log("delete request");
    axios
      .post("http://localhost:8000/cal/deleteevent", { user: globalState.user.id , eventId: props.event._id})
      .then((responce) => {
        if (responce.data.success) {
          changeGlobalState("event", {});
          changeGlobalState("events", responce.data.events);
        }
      })
      .catch((err) => console.log(err));

  }

  function manageEventName () {
    if( props.event.title.length > 8) {
      return(props.event.title.slice(0,8) + "...");
    }
    return(props.event.title);
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
