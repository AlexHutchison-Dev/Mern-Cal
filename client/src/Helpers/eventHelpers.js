// import React from 'react';
// import axios from "axios";
// import { UserContext } from "../Contexts/UserContext";

// const [userContext, changeUserContext] = React.useContext(UserContext);

// export function postAddEvent(newEvent, callback) {
//   axios
//     .post("http://localhost:8000/cal/addevent", { ...newEvent })
//     .then((responce) => {
//       if (responce.data.success) {
//         changeUserContext.clearEventStore();
//         changeUserContext.updateUserEvents(responce.data.events);
        
//       }
//       console.log(responce);
//     })
//     .catch((err) => console.log(err));
// }
