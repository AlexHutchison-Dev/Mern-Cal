import axios from "axios";

export function authenticateUser(credentials,callback) {
  axios
    .post("http://localhost:8000/user/login", credentials)
    .then((responce) => {
      console.log(responce.data.idEvents);
      callback(responce.data.id);
    })
    .catch((err) => {
      callback({sucess: false, message: "Invalid Username or password"});
      console.log(err);
    });
}

export function fetchEvents(id, callback) {
  if (!id) return console.error("no user id provided to retrieve events");
  console.log(`fetchEvents called`)
  axios
    .post("http://localhost:8000/cal", {
      id: id,
    })
    .then((responce) => {
      callback(responce.data.events);
    })
    .catch((err) =>{
    console.log(err);
      return null;
    }) 
}

export function addEvent(newEvent, callback) {
  axios
    .post("http://localhost:8000/cal/addevent", { ...newEvent })
    .then((responce) => {
      if (responce.data.success) {
        callback(responce.data.events);
        console.log(responce);
      }
    })
    .catch((err) => console.log(err));
}
