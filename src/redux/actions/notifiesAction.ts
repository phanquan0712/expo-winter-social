import { getApi, patchApi } from './../../utils/fetchData';
import { Dispatch } from 'react';
import { IAuth } from '../types/authType';
import { CREATE_NOTIFY, UPDATE_NOTIFY, INotify, INotifyType, GET_NOTIFY, DELETE_ALL_NOTIFY, LOAD_NOTIFIES } from './../types/notifiesType';
import { delApi, postApi } from '../../utils/fetchData';
import { ShowError } from '../../utils/ShowMessage';
import { Socket } from 'socket.io-client';

export const createNotify = (notify: INotify, auth: IAuth, socket: Socket) => async(dispatch: Dispatch<INotifyType>) => {
   try {
      const res = await postApi('notify', notify, auth.access_token)
      socket.emit('createNotify', {
         ...res.data.notify,
         user: auth.user
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const deleteNotify = (notify: INotify, auth: IAuth, socket: Socket) => async(dispatch: Dispatch<INotifyType>) => {
   if(!auth.access_token || !auth.user) return ShowError('Please login to continue')
   try {
      await delApi(`notify/${notify.id}?url=${notify.url}`, auth.access_token)
      socket.emit('deleteNotify', notify)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}


export const getNotifies = (token: string) => async(dispatch: Dispatch<INotifyType>) => {
   try {
      dispatch({type: LOAD_NOTIFIES, payload: true})
      const res = await getApi('notify', token)
      dispatch({ type: GET_NOTIFY, payload: res.data.notifies})
      dispatch({type: LOAD_NOTIFIES, payload: false})
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const isReadNotify = (item: INotify, auth: IAuth) => async(dispatch: Dispatch<INotifyType>) => {
   try {
      dispatch({ type: UPDATE_NOTIFY, payload: { ...item, isRead: true }})
      await patchApi(`isReadNotify/${item._id}`, {}, auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const deleteAllNotify = (auth: IAuth) => async(dispatch: Dispatch<INotifyType>) => {
   try {
      dispatch({ type: DELETE_ALL_NOTIFY, payload: {}})
      await delApi('deleteAllNotfies', auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}