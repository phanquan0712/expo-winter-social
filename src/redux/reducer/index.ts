import { combineReducers } from "redux";
import authReducer from "./authReducer";
import discoverPeopleReducer from "./discoverPeopleReducer";
import postReducer from "./postReducer";
export default combineReducers({
   auth: authReducer,
   discoverPeople: discoverPeopleReducer,
   post: postReducer,
})