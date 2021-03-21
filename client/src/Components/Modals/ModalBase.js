import React, { useContext } from "react";
import ReactDom from "react-dom";
import CreateEvent from "../CreateEventModalContent";
import EventModalContent from "../EventModalContent";
import { ModalContext } from "../../Contexts/ModalContext";

function ModalBase() {
  
  const [modalContext] = useContext(ModalContext);

  console.log(`from modal base modalContext: ${modalContext}`);

  const modalContentType = {
    addevent: <CreateEvent></CreateEvent>,
    event: <EventModalContent></EventModalContent>,
    
  };

  if (modalContext.modalVisibility) {
  return ReactDom.createPortal(
    <div>
    { modalContext.modalType ? modalContentType[modalContext.modalType]: ""}
    </div>,
    document.getElementById("portal")
    );

  }
  else return "";
}

export default ModalBase;
