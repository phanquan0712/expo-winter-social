import { GET_POST, IPostType, POST_LOAD, UPDATE_POST } from "../types/postType";
import { Dispatch } from "redux";
import { ShowError } from "../../utils/ShowMessage";
import { getApi, patchApi } from "../../utils/fetchData";
import { IPost } from "../../utils/TypeScript";
import { IAuth } from "../types/authType";
export const getPost = (token: string, limit: number = 1) => async (dispatch: Dispatch<IPostType>) => {
   try {
      dispatch({ type: POST_LOAD, payload: true})
      const res = await getApi(`posts?limit=${limit * 9}`, token)
      dispatch({
         type: GET_POST,
         payload: {...res.data, page: limit},
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const likePost = (post: IPost, auth: IAuth,) => async(dispatch: Dispatch<IPostType>) => {
   if(!auth.user) return ShowError('Please login to like this post')
   const newPost: IPost = {
      ...post, 
      likes: [
         ...post.likes,
         auth.user
      ]
   }
   dispatch({
      type: UPDATE_POST,
      payload: newPost
   })
   try {
      await patchApi(`posts/${post._id}/like`, {}, auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)      
   }
}

export const unLikePost = (post: IPost, auth: IAuth,) => async(dispatch: Dispatch<IPostType>) => {
   if(!auth.user) return ShowError('Please login to like this post')
   const newPost: IPost = { ...post, likes: post.likes.filter(item => item._id !== auth.user?._id) }
   dispatch({
      type: UPDATE_POST,
      payload: newPost
   })
   try {
      await patchApi(`posts/${post._id}/unlike`, {}, auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)      
   }
}