import { combineReducers } from "redux";
import authReducer from "./authReducer";
import discoverPeopleReducer from "./discoverPeopleReducer";
import postReducer from "./postReducer";
import discoverPostReducer from "./discoverPostReducer";
import postDetailReducer from "./postDetailReducer";
import userReducer from "./userReducer";
import notifyReducer from "./notifiesReducer";
import messageReducer from "./messageReducer";
import tagAnswerCommentReducer from "./tagAnswerComment";
import profilePostReducer from "./profilePostReducer";
import socket from "./socketReducer";
import online from './onlineReducer';
export default combineReducers({
   auth: authReducer,
   discoverPeople: discoverPeopleReducer,
   post: postReducer,
   discoverPost: discoverPostReducer,
   postDetail: postDetailReducer,
   user: userReducer,
   notify: notifyReducer,
   message: messageReducer,
   commentTag: tagAnswerCommentReducer,
   profilePost: profilePostReducer,
   socket: socket,
   online: online
})