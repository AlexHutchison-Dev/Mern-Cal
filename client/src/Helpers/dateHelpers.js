import dayjs from "dayjs";

// returns day name from index int
export function getDay(index) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return index === "list" ? weekdays : weekdays[index];
}

// returns month name string from index int
export function getMonth(index) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[index];
}

// returns day of 1st of the month as index from current selected day int and date int
export function monthStartDay(targetDate) {
  var date = targetDate.$D;
  var day = targetDate.$W;

  for (let i = date; i > 1; i--) {
    day--;
    date--;
    if (day < 0) {
      day = 6;
    }
    if (date === 1) break;
  }
  return day;
}

export function getDaysInMonth(targetDate) {
  return dayjs(
    `${targetDate.$y}-${targetDate.$M + 1}-${targetDate.$D}`
  ).daysInMonth();
}

export function changeTargetDateMonth(monthOffset) {
  var targetDate = null;

  if (monthOffset === 0) {
    targetDate = dayjs();
  }

  monthOffset < 0
    ? (targetDate = dayjs().subtract(
        Math.abs(monthOffset),
        "month"
      ))
    : (targetDate = dayjs().add(monthOffset, "month"));

    return targetDate;
}
