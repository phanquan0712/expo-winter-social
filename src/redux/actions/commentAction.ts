import { IComment, IPost, IUser } from "../../utils/TypeScript";
import { Dispatch } from "react";
import  { UPDATE_POST, IPostType } from "../types/postType";
import { IAuth } from "../types/authType";
import { ShowError } from "../../utils/ShowMessage";
import { patchApi } from "../../utils/fetchData";
export const likeComment = (post: IPost, comment: IComment, auth: IAuth) => async(dispatch: Dispatch<IPostType>) => {
   try {
      await patchApi(`posts/${post._id}/like`, {}, auth.access_token)
      const newComment = {
         ...comment, 
         likes: [
            ...comment.likes,
            auth.user
         ]
      }
      const newPost = {
         ...post, 
         comments: (post.comments as IComment[]).map(cm => cm._id === comment._id ? newComment : cm)
      }
      dispatch({type: UPDATE_POST, payload: newPost as IPost})
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const unLikeComment = (post: IPost, comment: IComment, auth: IAuth) => async(dispatch: Dispatch<IPostType>) => {
   try {
      const newComment = {
         ...comment, 
         likes: comment.likes.filter(like => like._id !== (auth.user as IUser)._id)
      }
      const newPost = {
         ...post, 
         comments: (post.comments as IComment[]).map(cm => cm._id === comment._id ? newComment : cm)
      }
      dispatch({type: UPDATE_POST, payload: newPost as IPost})
      await patchApi(`posts/${post._id}/unlike`, {}, auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}