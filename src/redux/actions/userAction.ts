import { LOAD_USER, UN_FOLLOW } from './../types/userType';
import { IAuthType, AUTH, LOAD_AUTH } from './../types/authType';
import { GET_USER, LOAD_USER_POST, IUpdateProfile, FOLLOW, IProfileType, GET_POST_USER, GET_SAVED_POST } from "../types/userType";
import { Dispatch } from 'react';
import { getApi, patchApi } from '../../utils/fetchData';
import { imageUpload, checkImage } from '../../utils/imageUpload';
import { IAuth } from './../types/authType';
import { IPost, IUser } from '../../utils/Typescript';
import { ShowError, ShowSuccess } from '../../utils/ShowMessage';

export const getProfileUser = (id: string, token?: string) => {
   return async (dispatch: Dispatch<IProfileType>) => {
      try {
         dispatch({ type: LOAD_USER, payload: true })
         const resUser = await getApi(`user/${id}`, token)
         const resPost = await getApi(`user_posts/${id}`, token)
         // const resSaved = await getApi(`saved_posts`, token)
         dispatch({ type: GET_USER, payload: resUser.data.user })
         dispatch({ type: GET_POST_USER, payload: resPost.data.posts })
         // dispatch({ type: GET_SAVED_POST, payload: resSaved.data.saved })
         dispatch({ type: LOAD_USER, payload: false })
      } catch (err: any) {
         return ShowError(err.response.data.msg)
      }
   }
}


export const follow = (user: IUser, auth: IAuth) => async (dispatch: Dispatch<IProfileType | IAuthType>) => {
   try {
      const newUser = { ...user, followers: [...user.followers, auth.user] }
      dispatch({ type: FOLLOW, payload: newUser as IUser })
      await patchApi(`/user/${user._id}/follow`, {}, auth.access_token);
      dispatch({
         type: AUTH,
         payload: {
            access_token: auth.access_token as string,
            user: {
               ...auth.user,
               following: [...(auth.user as IUser).following, newUser]
            } as IUser
         }
      })
      // return ShowSuccess(res.data.msg)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const unfollow = (user: IUser, auth: IAuth) => async (dispatch: Dispatch<IProfileType | IAuthType>) => {
   try {
      const newUser = {
         ...user,
         followers: user.followers.filter((item: IUser) => item._id !== auth.user?._id)
      }
      dispatch({ type: FOLLOW, payload: newUser as IUser })
       await patchApi(`/user/${user._id}/unfollow`, {}, auth.access_token);
      dispatch({
         type: AUTH,
         payload: {
            access_token: auth.access_token as string,
            user: {
               ...auth.user,
               following: (auth.user as IUser).following.filter((item: IUser) => item._id !== newUser._id)
            } as IUser
         }
      })
      // return ShowSuccess(res.data.msg)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

