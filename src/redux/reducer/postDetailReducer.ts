import { IPost } from "../../utils/TypeScript";
import { GET_POST_DETAIL, GET_POST_DETAIL_LOADING,  IGetDetailPostType, IStateType } from "../types/postDetailType";

const initialState: IStateType = {
   isLoad: false,
   post: {} as IPost
}

const postDetailReducer = (state = initialState, action: IGetDetailPostType) => {
   switch(action.type) {
      case GET_POST_DETAIL_LOADING:
         return {
            ...state,
            isLoad: action.payload
         }
      case GET_POST_DETAIL:
         return { 
            ...state,
            post: action.payload
         }
      default:
         return state;
   }
}

export default postDetailReducer;