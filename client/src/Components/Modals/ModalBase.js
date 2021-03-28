import React, { useContext} from "react";
import ReactDom from "react-dom";
import CreateEvent from "../CreateEventModalContent";
import EventModalContent from "../EventModalContent";
import { ModalContext } from "../../Contexts/ModalContext";
import { UserContext } from "../../Contexts/UserContext";


function ModalBase() {
  
  const [modalContext] = useContext(ModalContext);
  const [, changeUserContext] = useContext(UserContext);


  console.log(`from modal base modalContext: ${modalContext}`);

  const modalContentType = {
    addevent: <CreateEvent resetEventStore={resetEventStore}></CreateEvent>,
    event: <EventModalContent></EventModalContent>,
    
  };

  function resetEventStore () {
    changeUserContext.clearEventStore();
  }

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
