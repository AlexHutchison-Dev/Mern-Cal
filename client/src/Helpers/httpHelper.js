import axios from "axios";

var serverURL = "";

if (process.env.NODE_ENV !== "production") {
  
  serverURL = "http://localhost:8000";
}

export function registerUser(credentials, callback) {
  axios
    .post(serverURL + "/user/register", credentials)
    .then((responce) => {
      console.log(responce.data);
      callback(responce.data);
    })
    .catch((err) => console.log(err));
}

export function authenticateUser(credentials, callback) {
  axios
    .post(serverURL + "/user/login", credentials)
    .then((responce) => {
      console.log(responce.data.id);
      callback(responce.data.id);
    })
    .catch((err) => {
      callback({ sucess: false, message: "Invalid Username or password" });
      console.log(err);
    });
}

export function fetchEvents(id, callback) {
  if (!id) return console.error("no user id provided to retrieve events");
  console.log(`fetchEvents called`);
  axios
    .post(serverURL + "/cal", {
      id: id,
    })
    .then((responce) => {
      callback(responce.data.events);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export function addEvent(newEvent, callback) {
  axios
    .post(serverURL + "/cal/addevent", { ...newEvent })
    .then((responce) => {
      if (responce.data.success) {
        callback(responce.data.events);
        console.log(responce);
      }
    })
    .catch((err) => console.log(err));
}

export function deleteEvent(userId, eventId, callback) {
  console.log("delete request");
  axios
    .post(serverURL + "/cal/deleteevent", { user: userId, eventId: eventId })
    .then((responce) => {
      callback(responce);
    })
    .catch((err) => console.log(err));
}

export function updateEvent(id, event, callback) {
  axios
    .post(serverURL + "/cal/updateevent", { _id: id, event: event })
    .then((responce) => {
      console.log(responce);
      callback({ success: true, message: responce.data });
    })
    .catch((error) => {
      return { sucess: false, message: error };
    });
}
