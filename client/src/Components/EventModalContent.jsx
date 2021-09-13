import React, { useState, useContext } from "react";
import styled from "styled-components";
import { updateEvent, fetchEvents, deleteEvent } from "../Helpers/httpHelper";
import { ModalContext } from "../Contexts/ModalContext";
import { UserContext } from "../Contexts/UserContext";
import DateString from "./DateString";

const EventContainer = styled.div`
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

const TextInput = styled.input`
  margin: 10px;
  width: 30vw;
  border: 1px solid #555;
  border-radius: 3px;
  padding: 5px;
`;

const NumberInput = styled.input`
  margin: 10px;
  width: 50px;
`;
const PageBtn = styled.div`
  margin: 10px;
`;

function CreateEvent() {
  const [, changeModalContext] = useContext(ModalContext);
  const [userContext, changeUserContext] = useContext(UserContext);
  const [error, setError] = useState("");
  const [edited, setEdited] = useState(false);
  const [eventFields, setEventFields] = useState({
    title: userContext.eventStore.title,
    notes: userContext.eventStore.notes,
    hour: userContext.eventStore.hour,
    mins: userContext.eventStore.mins,
  });

  function handleChange(event) {
    console.log(`event.target: ${event.target.name} ${event.target.value}`);
    const changes = { [event.target.name]: event.target.value };
    setEventFields((prevValue) => {
      return { ...prevValue, ...changes };
    });
    testForEdits();
  }

  function saveChanges() {
    console.log(`Saving changes to event, new Values: ${eventFields}`);
    console.log(userContext.eventStore._id);
    console.log({ ...userContext.eventStore, ...eventFields });

    if (validatNote(eventFields)) {
      updateEvent(
        userContext.user.id,
        { ...userContext.eventStore, ...eventFields },
        (responce) => {
          console.log(responce);
          if (responce.success) {
            console.log("handling close");
            handleClose();
          }
        }
      );
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      saveChanges(event);
    }
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

    setError("");
  }

  function validatNote(note) {
    if (!note.title) {
      setError("Please Enter valid title");
      return false;
    }
    if (!note.hour) {
      setError("Please Enter valid hour");
      return false;
    }
    if (!note.mins) {
      setError("Please Enter valid mins");
      return false;
    }
    return true;
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

  function testForEdits() {
    if (
      eventFields.title !== userContext.eventStore.title ||
      eventFields.notes !== userContext.eventStore.notes
    ) {
      setEdited(true);
      console.log("edited");
    } else setEdited(true);
  }

  return (
    <div onKeyPress={handleKeyPress}>
      <EventContainer>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <h1>New Event</h1>
        </div>

        <div className="row">
          <DateString
            date={userContext.eventStore.date}
            heading="subheading"
          ></DateString>
        </div>

        <div className="row">
          <label>Title</label>
        </div>

        <div className="row">
          <TextInput
            name="title"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={handleChange}
            value={eventFields.title ? eventFields.title : ""}
          />
        </div>

        <div className="row">
          <label>Notes</label>
        </div>

        <div className="row">
          <TextInput
            name="notes"
            type="textarea"
            rows={5}
            placeholder="Notes"
            onChange={handleChange}
            value={eventFields.notes ? eventFields.notes : ""}
          />
        </div>

        <div className="row">
          <label>Time</label>
        </div>

        <div className="row">
          <label>Hour</label>
          <NumberInput
            type="number"
            name="hour"
            min="00"
            max="23"
            placeholder="00"
            onChange={handleChange}
            value={eventFields.hour ? eventFields.hour : ""}
          />
          <label>Mins</label>
          <NumberInput
            type="number"
            name="mins"
            min="00"
            max="59"
            step="15"
            placeholder="00"
            onChange={handleChange}
            value={eventFields.mins ? eventFields.mins : ""}
          />
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
      </EventContainer>
    </div>
  );
}

export default CreateEvent;
