import { IComment, IUser } from "../../utils/TypeScript"
import  { ITagAnswerCommentType, TAG_ANSWER_COMMENT } from "../types/commentType"

const initSatate: IComment = {} as IComment

const tagAnswerCommentReducer = (state = initSatate, action: ITagAnswerCommentType) => {
   switch(action.type) {
      case TAG_ANSWER_COMMENT:
         return action.payload
      default:
         return state
   }
}

export default tagAnswerCommentReducer