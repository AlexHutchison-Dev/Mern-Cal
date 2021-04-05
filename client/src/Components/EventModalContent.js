import React, { useContext, useState } from "react";
import { updateEvent, fetchEvents } from "../Helpers/httpHelper";
import styled from "styled-components";
import { deleteEvent } from "../Helpers/httpHelper";
import { ModalContext } from "../Contexts/ModalContext";
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

const Title = styled.h1`
  margin-bottom: 30px;
`;

const DataField = styled.input`
  margin: 10px;
  width: 30vw;
  border: 1px solid #555;
  border-radius: 3px;
  padding: 5px;
`;
function EventModalContent() {
  //TODO add edditing functionality

  const [, changeModalContext] = useContext(ModalContext);
  const [userContext, changeUserContext] = useContext(UserContext);
  const [edited, setEdited] = useState(false);
  const [eventFields, setEventFields] = useState({
    title: userContext.eventStore.title,
    notes: userContext.eventStore.notes,
  });

  function handleChange(event) {
    const fields = { 
      [event.target.name] : event.target.value
    };
    console.log(fields);
    setEventFields((prevValue) => {
      return { ...prevValue, ...fields };
    });
    testForEdits();
  }
  function saveChanges() {
    //TODO
    console.log(`Saving changes to event, new Values: ${eventFields}`);
    console.log(userContext.eventStore._id);
    console.log({...userContext.eventStore, ...eventFields})
    updateEvent(
      userContext.user.id,

      { ...userContext.eventStore, ...eventFields },
      (responce) => {
        console.log(responce);
        if (responce.success) {
          console.log("handling close")
          handleClose();
        }
      }
    );
  }

  function testForEdits() {
    if (
      eventFields.title !== userContext.eventStore.title ||
      eventFields.notes !== userContext.eventStore.notes
    ) {
      setEdited(true);
      console.log("edited");
    } else setEdited(true);
  }

  function handleClose(event) {
    if (event) {
      event.preventDefault();
    }
    fetchEvents(userContext.user.id, (events) => {
      changeUserContext.updateUserEvents(events);
      changeModalContext.restoreDefaultState();
      changeUserContext.clearEventStore();
    });
  }

  function handleDeleteClick() {
    console.log("delete request");
    deleteEvent(userContext.user.id, userContext.eventStore._id, (responce) => {
      if (responce.data.success) {
        changeUserContext.updateUserEvents(responce.data.events);
        handleClose();
      }
    });
  }

  return (
    <div>
      <CreateEventContainer>
        <Title>Event</Title>
        <div className="row">
          <DateString
            date={userContext.eventStore.day}
            heading="subheading"
          ></DateString>
        </div>
        <div className="row">
          <label>Title</label>
        </div>

        {/* Title Field */}

        <div className="row">
          <DataField
            name="title"
            placeholder="Title..."
            defaultValue={eventFields.title}
            onChange={handleChange}
          ></DataField>
        </div>

        {/* Notes Field */}

        <div className="row">
          <label>Notes</label>
        </div>

        <div className="row">
          <DataField
            name="notes"
            placeholder="Notes..."
            defaultValue={eventFields.notes}
            onChange={handleChange}
          ></DataField>
        </div>

        {/* Controls */}

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

          <PageBtn>
            <button
              type="button"
              className="btn btn-success"
              onClick={saveChanges}
              disabled={!edited}
            >
              Save Changes
            </button>
          </PageBtn>
        </div>
      </CreateEventContainer>
    </div>
  );
}

export default EventModalContent;
