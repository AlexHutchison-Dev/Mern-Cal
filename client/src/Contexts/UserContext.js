import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const defaultState = {
    user: {
      id: "",
      events: [],
    },
    eventStore: null,
  };

  const [userContext, setUserContext] = useState(defaultState);

  const changeUserContext = {
    //replaces user
    logIn: (modifier, callback) => {
      console.log("changeUserContext login called: " + modifier);
      setUserContext((prevValue) => {
        return { ...prevValue, user: { id: modifier } };
      });
      if (callback) callback();
    },

    logOut: () => {
      setUserContext(defaultState);
    },

    //replaces event
    eventStore: (modifier, callback) => {
      setUserContext((prevValue) => {
        return { ...prevValue, eventStore: { ...modifier } };
      });
      if (callback) callback();
    },

    //replaces resetEvent
    clearEventStore: (callback) => {
      setUserContext((prevValue, callback) => {
        return { ...prevValue, eventStore: null };
      });
      if (callback) callback();
    },

    //replaces events
    updateUserEvents: (modifier, callback) => {
      setUserContext((prevValue) => {
        return { ...prevValue, user: { ...prevValue.user, events: [...modifier] } };
      });
      if (callback) callback();
    },
  };

  return (
    <UserContext.Provider value={[userContext, changeUserContext]}>
      {props.children}
    </UserContext.Provider>
  );
};
