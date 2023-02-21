import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IPost, RootStore } from './src/utils/Typescript'
import { UPDATE_POST } from './src/redux/types/postType'
import { FOLLOW } from './src/redux/types/userType'
import { IUser } from './src/utils/Typescript'
import { AUTH } from './src/redux/types/authType'
import { GET_NOTIFY, CREATE_NOTIFY, DELETE_NOTIFY } from './src/redux/types/notifiesType'
import { OPEN_MODAL_COMMENT } from './src/redux/types/commentType'
// import audiobell from './audio/client_src_audio_got-it-done-613.mp3'
import { addMessage } from './src/redux/actions/messageAction'
import { ADD_MESSAGE, DELETE_MESSAGE, IUserMessage, ADD_USER, IMessage } from './src/redux/types/messageType'
import { OFFLINE, ONLINE } from './src/redux/types/onlineType'
import { CALL } from './src/redux/types/callType'
import { ShowError } from './src/utils/ShowMessage'
import { GET_POST_DETAIL } from './src/redux/types/postDetailType'
import { View } from 'react-native'


const token = 'ExponentPushToken[P73eNLGwmWwDVyW_GTrpU9]'

const SocketClient = () => {
   const { auth, socket, notify, message, online } = useSelector((state: RootStore) => state);
   const dispatch = useDispatch();


   // joinUser
   useEffect(() => {
      if(!socket) return;
      socket.emit('joinUser', auth.user)
      return () => socket.off('joinUser')
   }, [auth.user, socket])

   // Likes
   useEffect(() => {
      if(!socket) return;
      socket.on('likeToClient', (data: any) => {
         dispatch({ type: UPDATE_POST, payload: data })
      })
      return () => socket.off('likeToClient')
   }, [socket, dispatch])

   // UnLike
   useEffect(() => {
      if(!socket) return;
      socket.on('unLikeToClient', (data: any) => {
         dispatch({ type: UPDATE_POST, payload: data })
         console.log(data);
      })
      return () => socket.off('unLikeToClient')
   }, [socket, dispatch])

   // Create Comment
   useEffect(() => {
      if(!socket) return;
      socket.on('createCommentToClient', (data: any) => {
         dispatch({ type: GET_POST_DETAIL, payload: data })
      })
      return () => socket.off('createCommentToClient')
   }, [socket, dispatch])

   // Create Answer Comment
   useEffect(() => {
      if(!socket) return;
      socket.on('createAnswerCommentToClient', (data: any) => {
         dispatch({ type: GET_POST_DETAIL, payload: data })
      })
      return () => socket.off('createAnswerCommentToClient')
   }, [socket, dispatch])

   // Delete Comment
   useEffect(() => {
      if(!socket) return;
      socket.on('deleteCommentToClient', (data: any) => {
         dispatch({ type: UPDATE_POST, payload: data })
      })
      return () => socket.off('deleteCommentToClient')
   }, [socket, dispatch])

   // Follow
   useEffect(() => {
      if(!socket) return;
      socket.on('followToClient', (data: any) => {
         dispatch({ type: FOLLOW, payload: (data as IUser) })
         if (auth.user)
            dispatch({
               type: AUTH,
               payload: {
                  ...auth,
                  user: data
               }
            })
      })
      return () => socket.off('followToClient')
   }, [socket, dispatch])

   // UnFollow
   useEffect(() => {
      if(!socket) return;
      socket.on('unFollowToClient', (data: any) => {
         dispatch({ type: FOLLOW, payload: (data as IUser) })
         if (auth.user)
            dispatch({
               type: AUTH,
               payload: {
                  ...auth,
                  user: data
               }
            })
      })
      return () => socket.off('unFollowToClient')
   }, [socket, dispatch])

   // Notification
   useEffect(() => {
      console.log('test before');
      
      if(!socket) return;
      console.log('test after');
      
      socket.on('createNotifyToClient', (data: any) => {
         dispatch({ type: CREATE_NOTIFY, payload: data })
         async function sendPushNotification(token: string) {
            const message = {
               to: token,
               sound: 'default',
               title: 'Original Title',
               body: 'And here is the body!',
               data: { someData: 'goes here' },
            };

            await fetch('https://exp.host/--/api/v2/push/send', {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(message),
            });
         }
         sendPushNotification(token)
      })

      return () => socket.off('createNotifyToClient')
   }, [socket, notify.sound, dispatch])

   useEffect(() => {
      if(!socket) return;
      socket.on('deleteNotifyToClient', (data: any) => {
         dispatch({ type: DELETE_NOTIFY, payload: data })
      })
      return () => socket.off('deleteNotifyToClient')
   }, [socket, dispatch])


   // Message
   useEffect(() => {
      if(!socket) return;
      socket.on('addMessageToClient', (data: any) => {
         console.log(data)
         dispatch({ type: ADD_MESSAGE, payload: data });
         if (message.users.every(item => item._id !== data.user?._id)) {
            dispatch({
               type: ADD_USER, payload: {
                  ...data.user,
                  text: data.text,
                  media: data.media
               }
            });
         }
      })
      return () => socket.off('addMessageToClient')
   }, [socket, dispatch])

   useEffect(() => {
      if(!socket) return;
      socket.on('deleteMessageToClient', (data: any) => {
         dispatch({ type: DELETE_MESSAGE, payload: data });
      })
      return () => socket.off('deleteMessageToClient')
   }, [socket, dispatch])

   // Check User Online / Offline
   useEffect(() => {
      if(!socket) return;
      socket.emit('checkUserOnline', auth.user)
   }, [socket, dispatch])

   useEffect(() => {
      if(!socket) return;
      socket.on('checkUserOnlineToMe', (data: any) => {
         (data as any[]).forEach(item => {
            if (!online.includes(item.id)) {
               dispatch({ type: ONLINE, payload: item.id })
            }
         });
      })
      return () => socket.off('checkUserOnlineToMe')
   }, [socket, dispatch, online])

   useEffect(() => {
      if(!socket) return;
      socket.on('checkUserOnlineToClient', (data: any) => {
         if (!online.includes(data)) {
            dispatch({ type: ONLINE, payload: data })
         }
      })
      return () => socket.off('checkUserOnlineToClient')
   }, [socket, dispatch, online])

   useEffect(() => {
      if(!socket) return;
      socket.on('checkUserOffline', (data: any) => {
         dispatch({ type: OFFLINE, payload: data })
      })
      return () => socket.off('checkUserOffline')
   }, [socket, dispatch])

   // Call User
   useEffect(() => {
      if(!socket) return;
      socket.on('callUserToClient', (data: any) => {
         console.log(data);
         dispatch({ type: CALL, payload: { ...data, isOpen: true } })
      })
      return () => socket.off('callUserToClient')
   }, [socket, dispatch])


   useEffect(() => {
      if(!socket) return;
      socket.on('UserBusy', (data: any) => {
         return ShowError(
            'The user is busy with another call. Please try again later.'
         )
      })
      return () => socket.off('UserBusy')
   }, [socket, dispatch])




   return (
      <View>
      </View>
   )
}

export default SocketClient