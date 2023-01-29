import { GET_POST_USER, IGetPostStateType, IProfileType, LOAD_USER } from "../types/userType";

const initialState: IGetPostStateType = {
   _id: '',
   load: false,
   posts: [],
   total: 0,
   page: 0,
}

const userReducer = (state = initialState, action: IProfileType) => {
   switch(action.type) {
      case LOAD_USER: 
         return {
            ...state,
            load: action.payload
         }
      case GET_POST_USER:
         return {
            ...state,
            ...action.payload
         }
      default:
         return state;
   }
}

export default userReducer