import React, { useState, createContext, useEffect } from "react";
import dayjs from "dayjs";

export const GlobalState = createContext();

export const StateProvider = (props) => {
  const [globalState, setGlobalState] = useState({
    targetDate: "",
    monthOffset: 0,
  });
  // Update targetDate state when month offset changed
  useEffect(() => {
    
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
  }

  return (
    <GlobalState.Provider value={[globalState, changeGlobalState]}>
      {props.children}
    </GlobalState.Provider>
  );
};
