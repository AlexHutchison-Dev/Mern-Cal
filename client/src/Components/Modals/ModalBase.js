import React, { useContext } from "react";
import ReactDom from "react-dom";
import CreateEvent from "../CreateEventModalContent";
import EventModalContent from "../EventModalContent";
import { GlobalState } from "../../Contexts/GlobalState";

function ModalBase() {
  const [globalState] = useContext(GlobalState);

  if (!globalState.modalVisibility) return null;

  console.log(globalState.modal);
  if (globalState.modal === "addevent") {
    return ReactDom.createPortal(
      <CreateEvent></CreateEvent>,
      document.getElementById("portal")
    );
  }
  if (globalState.modal === "event") {
    return ReactDom.createPortal(
      <EventModalContent></EventModalContent>,
      document.getElementById("portal")
    );
  }
  else return "";
}

export default ModalBase;
