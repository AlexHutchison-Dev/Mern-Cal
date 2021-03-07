import React, { useState, createContext, useEffect } from "react";
import dayjs from "dayjs";

export const GlobalState = createContext();

export const StateProvider = (props) => {
  const [globalState, setGlobalState] = useState({
    targetDate: "",
    monthOffset: 0,
    modalVisibility: false,
    modal: null,
    event: {},
    user: { id: "", events: [] },
  });
  // Update targetDate state when month offset changed
  useEffect(() => {
    setGlobalState((prevValue) => {
      return { ...prevValue, events: [] };
    });
    if (globalState.monthOffset === 0) {
      setGlobalState((prevValue) => {
        return { ...prevValue, targetDate: dayjs() };
      });
      return;
    }
    globalState.monthOffset < 0
      ? setGlobalState((prevValue) => {
          return {
            ...prevValue,
            targetDate: dayjs().subtract(
              Math.abs(globalState.monthOffset),
              "month"
            ),
          };
        })
      : setGlobalState((prevValue) => {
          return {
            ...prevValue,
            targetDate: dayjs().add(globalState.monthOffset, "month"),
          };
        });
  }, [globalState.monthOffset]);

  // Manage changes to global state
  function changeGlobalState(target, modifier, callback) {
    if (target === "monthOffset") {
      modifier === "subtract"
        ? setGlobalState((prevValue) => {
            return { ...prevValue, monthOffset: globalState.monthOffset - 1 };
          })
        : setGlobalState((prevValue) => {
            return { ...prevValue, monthOffset: globalState.monthOffset + 1 };
          });
      if (callback) callback();
    }

    // manage changes to current event
    if (target === "event") {
      setGlobalState((prevValue) => {
        return { ...prevValue, event: { ...modifier } };
      });
      if (callback) callback();
    }
    if (target === "resetEvent") {
      setGlobalState((prevValue) => {
        return { ...prevValue, event: {} };
      });
    }

    if (target === "events") {
      setGlobalState((prevValue) => {
        return {
          ...prevValue,
          user: { id: prevValue.user.id, events: modifier },
        };
      });
      if (callback) callback();
    }

    if (target === "modal") {
      setGlobalState((prevValue) => {
        return {
          ...prevValue,
          modal: modifier,
        };
      });
    }

    // Manage modals to display
    if (target === "modalVisibility") {
      setGlobalState((prevValue) => {
        return {
          ...prevValue,
          modalVisibility: !globalState.modalVisibility,
        };
      });
      if (callback) callback();
    }

    // if (target === "eventVisibility") {
    //   console.log(globalState.eventVisibility);
    //   setGlobalState((prevValue) => {
    //     return {
    //       ...prevValue,
    //       eventVisibility: !globalState.eventVisibility,
    //     };
    //   });
    //   if (callback) callback();
    // }

    if (target === "user") {
      console.log(modifier);
      setGlobalState((prevValue) => {
        return { ...prevValue, user: { ...prevValue.user, ...modifier } };
      });

      if (callback) callback();
    }
  }

  return (
    <GlobalState.Provider value={[globalState, changeGlobalState]}>
      {props.children}
    </GlobalState.Provider>
  );
};
