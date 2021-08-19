import React, { useState, createContext, useEffect } from "react";
import { changeTargetDateMonth } from "../Helpers/dateHelpers";
export const DateContext = createContext();

export const DateProvider = (props) => {
  const [dateContext, setDateContext] = useState({
    targetDate: "",
    monthOffset: 0,
  });
  // Update targetDate state when month offset changed
  useEffect(() => {
    setDateContext((prevValue) => {
      return {
        ...prevValue,
        targetDate: changeTargetDateMonth(dateContext.monthOffset),
      };
    });
  }, [dateContext.monthOffset]);

  function changeMonthOffset(modifier, callback) {
    if (modifier === 0) {
      setDateContext((prevValue) => {
        return { ...prevValue, monthOffset: 0 };
      });
    } else {
      modifier === "subtract"
        ? setDateContext((prevValue) => {
            return { ...prevValue, monthOffset: dateContext.monthOffset - 1 };
          })
        : setDateContext((prevValue) => {
            return { ...prevValue, monthOffset: dateContext.monthOffset + 1 };
          });
    }

    if (callback) callback();
  }

  return (
    <DateContext.Provider value={[dateContext, changeMonthOffset]}>
      {props.children}
    </DateContext.Provider>
  );
};
