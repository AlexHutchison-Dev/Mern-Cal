// import axios from "axios";
// import { GlobalState } from "../Contexts/GlobalState";


// const [globalState, changeGlobalState] = useContext(GlobalState);

// export function postAddEvent(newEvent, callback) {
//   axios
//     .post("http://localhost:8000/cal/addevent", { ...newEvent })
//     .then((responce) => {
//       if (responce.data.success) {
//         changeGlobalState("resetEvent");
//         changeGlobalState("events", responce.data.events);
//         calback();
//       }
//       console.log(responce);
//     })
//     .catch((err) => console.log(err));
// }
