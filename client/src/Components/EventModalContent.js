import React, {useContext } from "react";

import styled from "styled-components";
import axios from "axios";
import { GlobalState } from "../Contexts/GlobalState";
import { UserContext } from "../Contexts/UserContext";

import DateString from "./DateString";

const CreateEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  border: 2px solid #555;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  padding: 30px;
  z-index: 100;
  background: white;
`;

const PageBtn = styled.div`
  margin: 10px;
`;

const Title  = styled.h1`
margin-bottom: 30px;

`;

const DataField = styled.input `
  margin: 10px;
  width: 30vw;
  border: 1px solid #555;
  border-radius: 3px;
  padding: 5px;
`;
function EventModalContent() {

  //TODO add edditing functionality

  const [globalState, changeGlobalState] = useContext(GlobalState);
  const [userContext, changeUserContext] = useContext(UserContext);

  function handleClose(event) {
    if (event) {
      event.preventDefault();
    }
    changeUserContext.clearEventStore();
    changeGlobalState("modalVisibility", false);
  }

  function handleDeleteClick() {
    //TODO Remove to helper DRY violation
    console.log("delete request");
    axios
      .post("http://localhost:8000/cal/deleteevent", { user: userContext.user.id , eventId:userContext.eventStore._id})
      .then((responce) => {
        if (responce.data.success) {
          changeUserContext.clearEventStore();
          changeUserContext.updateUserEvents(responce.data.events);
          handleClose();
        }
      })
      .catch((err) => console.log(err));

  }

  return (
    <div>
      <CreateEventContainer>
      <Title>Event</Title>
      <div className="row">
        <DateString
          date={
            userContext.eventStore.date
          }
          heading="subheading"
        ></DateString>
      </div>
      <div className="row">
        <label>Title</label>
      </div>
      <div className="row">
        <DataField placeholder="Title..." defaultValue={userContext.eventStore.title} readonly></DataField>
      </div>
      <div className="row">
        <label>Notes</label>
      </div>

      <div className="row">
        <DataField placeholder="Notes..." defaultValue={userContext.eventStore.notes} readonly></DataField>
      </div>
      <div className="row">
        <PageBtn>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </PageBtn>
        <PageBtn>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClose}
          >
            Close
          </button>
        </PageBtn>
      </div>
    </CreateEventContainer>
    </div>
  )
}

export default EventModalContent
