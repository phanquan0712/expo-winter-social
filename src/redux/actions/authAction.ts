import { IAuthType , AUTH, LOGOUT, IUpdateUser, UPDATE_USER, ILoadAuthType, LOAD_AUTH} from './../types/authType';
import { ILoginUser, IRegisterUser, IUser } from '../../utils/Typescript';
import { Dispatch } from 'react';
import { ShowError, ShowSuccess } from '../../utils/ShowMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { patchApi, postApi } from '../../utils/fetchData';
import { checkDataLogin, checkDataRegister } from './../../utils/validData';
import { checkImage, imageUpload } from './../../utils/imageUpload';
export const login = (data: ILoginUser) => async(dispatch: Dispatch<IAuthType>) => {
   if(checkDataLogin(data).errLength > 0) return ShowError(checkDataLogin(data).errors[0])
   try {
      const res = await postApi('login', data);
      dispatch({
         type: AUTH,
         payload: {
            access_token: res.data.access_token,
            user: res.data.user
         }
      })
      await AsyncStorage.setItem('logged', 'winter');
      return ShowSuccess(res.data.msg);
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const register = (data: IRegisterUser) => async(dispatch: Dispatch<IAuthType>) => {
   if(checkDataRegister(data).errLength > 0) return ShowError(checkDataRegister(data).errors[0])
   try {
      await postApi('register', data);
      return ShowSuccess('Register Success, Now you can login.');
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const refreshToken = () => async(dispatch: Dispatch<IAuthType>) => {
   const token = await AsyncStorage.getItem('logged');
   if(token !== 'winter') return;
   try {
      const res = await postApi('refresh_token', {})
      dispatch({
         type: AUTH,
         payload: {
            access_token: res.data.access_token,
            user: res.data.user
         }
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const logout = () => async(dispatch: Dispatch<IAuthType  | any>) => {
   try {
      await AsyncStorage.removeItem('logged');
      await postApi('logout', {});
      dispatch({ type: LOGOUT})
      return ShowSuccess('Logout Success');
   } catch(err: any){
      return ShowError(err.response.data.msg)
   }
}

export const updateUser = (data: IUser, token: string) => async(dispatch: Dispatch<IUpdateUser | ILoadAuthType>) => {
   let url: string = ''
   try {
      dispatch({ type: LOAD_AUTH, payload: true})
      if(data.avatar) {
         const check = checkImage(data.avatar as File)
         if(check) {
            return ShowError(check)
         }
         const photo = await imageUpload(data.avatar as File)
         url = photo.url
      }
      const newData = {...data, avatar: url}

      const res = await patchApi('user', newData, token);
      dispatch({
         type: UPDATE_USER,
         payload: newData,
      })
      dispatch({ type: LOAD_AUTH, payload: false})
      return ShowSuccess(res.data.msg);
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}