import React, { useState, useContext } from "react";
import styled from "styled-components";
import { addEvent } from "../Helpers/httpHelper";
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
  const [note, setNote] = useState({});

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
    console.log(`note: ${JSON.stringify(note)}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validatNote(note)) {
      console.log(JSON.stringify(userContext.eventStore));

      const newEvent = {
        user: userContext.user.id,
        //inserts date, month year from context state
        ...userContext.eventStore,
        ...note,
      };
      console.log(`userEvent for submittal ${JSON.stringify(newEvent)}`);
      addEvent(newEvent, (events) => {
        changeUserContext.updateUserEvents(events, handleClose);
      });
    }
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }
  function handleClose(event) {
    if (event) {
      event.preventDefault();
    }
    setNote({});
    setError("");
    changeModalContext.restoreDefaultState();
    changeUserContext.clearEventStore();
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

  return (
    <div onKeyPress={handleKeyPress}>
      <CreateEventContainer>
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
            value={note.title ? note.title : ""}
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
            value={note.notes ? note.notes : ""}
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
            value={note.hour ? note.hour : ""}
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
            value={note.mins ? note.mins : ""}
          />
        </div>
        <div className="row">
          <PageBtn>
            <button
              type="submit"
              className="btn btn-primary close-btn"
              onClick={handleSubmit}
            >
              Submit
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
  );
}

export default CreateEvent;
