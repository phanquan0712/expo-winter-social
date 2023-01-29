import { postApi, getApi, delApi } from './../../utils/fetchData';
import { IAuth } from './../types/authType';
import { ADD_USER, ADD_MESSAGE, GET_MESSAGES, IMessageTypes, IStateType, DELETE_CONVERSATION, IMessage, GET_CONVERSATION, IUserMessage, DELETE_MESSAGE, GET_CONVERSATION_LOAD, GET_MESSAGES_LOAD } from "../types/messageType";
import { Dispatch } from "react";
import { IUser } from "../../utils/Typescript";
import { ShowError } from '../../utils/ShowMessage';





// export const addMessage = (message: IMessage, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IMessageTypes>) => {
//    dispatch({ type: ADD_MESSAGE, payload: message });
//    const newUser = {
//       _id: auth.user?._id,
//       username: auth.user?.username,
//       fullname: auth.user?.fullname,
//       avatar: auth.user?.avatar,
//    }
//    socket.emit('addMessage', {...message, user: { ...newUser }})
//    try {
//       await postAPi('message', message, auth.access_token);
//    } catch (err: any) {
//       dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
//    }
// }

export const getConversation = (auth: IAuth, page: number = 1) => async (dispatch: Dispatch<IMessageTypes>) => {
   try {
      dispatch({ type: GET_CONVERSATION_LOAD, payload: true})
      const res = await getApi(`conversations?limit=${page * 9}`, auth.access_token);
      let newArr: any[] = [];
      (res.data.conversations as any[]).forEach(item => {
         (item.recipients as any[]).forEach(cv => {
            if (cv._id !== auth.user?._id) {
               newArr.push({ ...cv, text: item.text, media: item.media, online:false, call: item.call });
            }
         })
      })
      dispatch({ type: GET_CONVERSATION, payload: { users: newArr as IUserMessage[], total: res.data.total } })
      dispatch({ type: GET_CONVERSATION_LOAD, payload: false})
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const getMessages = (id: string, auth: IAuth, page: number = 1) => async (dispatch: Dispatch<IMessageTypes>) => {
   try {
      dispatch({ type: GET_MESSAGES_LOAD, payload: true})
      const res = await getApi(`messages/${id}?limit=${page * 3}`, auth.access_token);
      dispatch({ type: GET_MESSAGES, payload: res.data })
      dispatch({ type: GET_MESSAGES_LOAD, payload: false})
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

// export const deleteMessage = (msg: IMessage, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IMessageTypes>) => {
//    dispatch({ type: DELETE_MESSAGE, payload: msg });
//    socket.emit('deleteMessage', msg)
//    try {
//       await deleteApi(`messages/${msg._id}`, auth.access_token);
//    } catch (err: any) {
//       dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
//    }
// }

// export const deleteConversation = (id: string, auth: IAuth) => async (dispatch: Dispatch<IAlertType | IMessageTypes>) => {
//    dispatch({ type: DELETE_CONVERSATION, payload: id})
//    try {
//       await deleteApi(`conversation/${id}`, auth.access_token);
//    } catch (err: any) {
//       dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
//    }
// }