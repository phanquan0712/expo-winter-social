import { UN_FOLLOW } from './../types/userType';
import { IUser } from './../../utils/TypeScript';
import { GET_POST_USER, IGetPostStateType, IProfileType, LOAD_USER, GET_USER, GET_SAVED_POST, FOLLOW } from "../types/userType";

const initialState: IGetPostStateType = {
   load: false,
   user: {} as IUser,
   posts: [],
   saved: [],
}

const profileReducer = (state = initialState, action: IProfileType) => {
   switch(action.type) {
      case LOAD_USER: 
         return {
            ...state,
            load: action.payload
         }
      case FOLLOW:
         return {
            ...state,
            user: action.payload
         }
      case UN_FOLLOW:
         return {
            ...state,
            user: action.payload
         }
      case GET_USER: 
         return {
            ...state,
            user: action.payload
         }
      case GET_POST_USER:
         return {
            ...state,
            posts: action.payload
         }
      case GET_SAVED_POST: 
         return {
            ...state,
            saved: action.payload
         }
      default:
         return state;
   }
}

export default profileReducer