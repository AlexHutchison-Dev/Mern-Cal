import React, { useState, useContext } from "react";

import styled from "styled-components";
import { GlobalState } from "../Contexts/GlobalState";
import DateString from "./DateString";
import {postAddEvent} from "../Helpers/eventHelpers";

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

const PageBtn = styled.div`
  margin: 10px;
`;

function CreateEvent() {

  const [globalState, changeGlobalState] = useContext(GlobalState);

  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(globalState.event));

    const newEvent = {
      user: globalState.user.id,
      ...globalState.event,
      title,
      notes,
    };
    console.log(`userEvent for submittal ${JSON.stringify(newEvent)}`);
    postAddEvent(newEvent, handleClose);
  }

  

  function handleClose(event) {
    if (event) {
      event.preventDefault();
    }
    changeGlobalState("resetEvent");
    changeGlobalState("modalVisibility", false);
    setNotes("");
    setTitle("");
    
  }

  return (
    <div>
      <CreateEventContainer>
      <div className="row">
        <h1>New Event</h1>
      </div>
      <div className="row">
        <DateString
          date={
            globalState.event.date
              ? globalState.event.date
              : "" 
          }
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
          onChange={handleTitleChange}
          value={title}
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
          onChange={handleNotesChange}
          value={notes}
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
  )
}

export default CreateEvent
