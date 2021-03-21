import React, { useState, createContext} from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userState, setUserState] = useState({
    user: {
      id: "",
      events: [],
    },
    eventStore: null,
  });

  const changeUserState = {
    // replaces user
    logIn: (modifier, callback) => {
      setUserState({ ...modifier });
      if (callback) callback();
    },

    //replaces event
    event: (modifier, callback) => {
      setUserState((prevValue) => {
        return { ...prevValue, eventStore: { ...modifier } };
      });
      if (callback) callback();
    },

    //replaces resetEvent
    clearEventStore: (callback) => {
      setUserState((prevValue, callback) => {
        return { ...prevValue, eventStore: null };
      });
      if (callback) callback();
    },

    //replaces events
    updateUserEvents: (modifier, callback) => {
      setUserState((prevValue) => {
        return { ...prevValue, user: { events: modifier } };
      });
      if (callback) callback();
    },
  };

  return( 
    <UserContext.Provider value={[userState, changeUserState]}>
      {props.children}
    </UserContext.Provider>
  );
};
