import { AUTH, IAuth, IAuthType, LOGOUT, UPDATE_USER, IUpdateUser, AuthType, LOAD_AUTH } from "../types/authType";
import { IUser } from "../../utils/TypeScript";
const initialState: AuthType = {
   load: false,
   user: {} as IUser,
   access_token: "",
   msg: "",
}

const authReducer = (state: IAuth = initialState, action: IAuthType | IUpdateUser | any) => {
   switch (action.type) {
      case LOAD_AUTH:
         return {
            ...state,
            load: action.payload
         }
      case AUTH:
         return action.payload
      case LOGOUT: 
         return {}
      case UPDATE_USER:
         return  {
            ...state,
            user: {
               ...state.user,
               ...action.payload
            }
         }
      default:
         return state
   }
}

export default authReducer