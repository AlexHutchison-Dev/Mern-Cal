import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const defaultState = {
    modalVisibility: false,
    modalType: null,
  };

  const [modalContext, setModalContext] = useState(defaultState);
  //replaces modalVisibility
  const changeModalContext = {
    toggleVisibility: () => {
      setModalContext((prevValue) => {
        return { ...prevValue, modalVisibility: !prevValue.modalVisibility };
      });
    },

    //replaces modal
    modalType: (modifier) => {
      setModalContext((prevValue) => {
        return { ...prevValue, modalType: modifier };
      });
    },

    restoreDefaultState: () => {
      setModalContext(defaultState);
    }
  };



  return (
    <ModalContext.Provider value={[modalContext, changeModalContext]}>
      {props.children}
    </ModalContext.Provider>
  );
};
