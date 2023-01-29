import { GET_POST, IPostType, POST_LOAD, UPDATE_POST, CREATE_POST } from "../types/postType";
import { Dispatch } from "redux";
import { ShowError, ShowSuccess } from "../../utils/ShowMessage";
import { getApi, patchApi, postApi } from "../../utils/fetchData";
import { IPost } from "../../utils/TypeScript";
import { IAuth } from "../types/authType";
import { imageUpload,  checkImage } from "../../utils/imageUpload";
import { IProfileType, LOAD_USER, GET_POST_USER } from "../types/userType";
export const getPost = (token: string, limit: number = 1) => async (dispatch: Dispatch<IPostType>) => {
   try {
      dispatch({ type: POST_LOAD, payload: true})
      const res = await getApi(`posts?limit=${limit * 9}`, token)
      dispatch({
         type: GET_POST,
         payload: {...res.data, page: limit},
      })
      dispatch({ type: POST_LOAD, payload: false})
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

export const createPost = (content: string, medias: any[], token: string) => async(dispatch: Dispatch<IPostType>) => {
   let listMedia = []
   try {
      dispatch({ type: POST_LOAD, payload: true})
      if(medias.length > 0) {
         for(const item of medias) {
            if(item.camera) {
               listMedia.push(await imageUpload(item.camera))
            } else {
               listMedia.push(await imageUpload(item))
            }
         }
      }
      const res = await postApi('posts', { content, images: listMedia}, token)
      dispatch({ type: CREATE_POST, payload: res.data.post })
      dispatch({ type: POST_LOAD, payload: false})
      return ShowSuccess('Post created successfully')
   } catch(err: any) {
      return ShowError(err.response.data.msg)      
   }
}

export const getUserPost = (id: string, token: string) => async(dispatch: Dispatch<IProfileType>) => {
   try {
      dispatch({
         type: LOAD_USER,
         payload: true
      })
      const res = await getApi(`/user_posts/${id}`, token);
      dispatch({
         type: GET_POST_USER,
         payload: res.data
      })
      dispatch({
         type: LOAD_USER,
         payload: false
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const getUserSavedPost = (token: string) => async(dispatch: Dispatch<IProfileType>) => {
   try {
      dispatch({
         type: LOAD_USER,
         payload: true
      })
      const res = await getApi(`saved_posts`, token)
      dispatch({
         type: GET_POST_USER,
         payload: res.data
      })
      dispatch({
         type: LOAD_USER,
         payload: false
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}