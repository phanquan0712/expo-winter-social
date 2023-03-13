import { IComment, IPost, IUser } from "../../utils/TypeScript";
import { Dispatch } from "react";
import  { UPDATE_POST, IPostType } from "../types/postType";
import { IAuth } from "../types/authType";
import { ShowError } from "../../utils/ShowMessage";
import { patchApi, postApi } from "../../utils/fetchData"
import  { ICommentType } from "../types/commentType";
import { IGetDetailPostType, GET_POST_DETAIL, GET_POST_DETAIL_LOADING   } from "../types/postDetailType";
import { Socket } from "socket.io-client";
import { createNotify } from "./notifiesAction";


export const likeComment = (post: IPost, comment: IComment, auth: IAuth) => async(dispatch: Dispatch<IPostType | IGetDetailPostType>) => {
   try {
      await patchApi(`comment/${comment._id}/like`, {}, auth.access_token)
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
      dispatch({type: GET_POST_DETAIL, payload: newPost as IPost})
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
      await patchApi(`comment/${comment._id}/unlike`, {}, auth.access_token)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const createComment = (post: IPost, comment: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<ICommentType | IGetDetailPostType>) => {
   try {
      const res = await postApi('comment', {
         postId: post._id,
         content: comment.content,
         tag: comment.tag,
      }, auth.access_token);
      let CommentPost: IComment[] = []
      if (post.comments) CommentPost = [...post.comments]
      const newData = {...res.data.newComment, user: auth.user}
      const newPost = { ...post, comments: [...CommentPost, newData] };
      dispatch({ type: GET_POST_DETAIL, payload: newPost })
      socket.emit('createComment', newPost)
      const msg = {
         id: res.data.newComment._id,
         text: 'has commented on your post',
         recipients: [post.user],
         url: `/posts/${post._id}`,
         content: post.content,
         image: post.images[0].url
      }
      dispatch((createNotify(msg, auth, socket) as any))
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const createAnswerComment = (post: IPost, comment: IComment, answerComment: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IGetDetailPostType | ICommentType>) => {
   try {
      const res = await postApi(`comment/${comment._id}/answer`, {
         postId: post._id,
         content: answerComment.content,
         tag: answerComment.tag,
      }, auth.access_token)
      let CommentPost: IComment[] = []
      if (post.comments) CommentPost = [...post.comments]
      let newDataComment = CommentPost.find(item => item._id === comment._id)
      if (newDataComment) {
         newDataComment = {
            ...newDataComment,
            reply: [...newDataComment.reply, {
               ...res.data.newComment,
               user: auth.user
            }]
         }
      }
      const newPost = {
         ...post,
         comments: CommentPost.map(item => item._id === comment._id ? newDataComment : item)
      }

      const msg = {
         id: res.data.newComment._id,
         text: 'mentioned you in a comment',
         recipients: [post.user],
         url: `/posts/${post._id}`,
         content: post.content,
         image: post.images[0].url
      }

      dispatch((createNotify(msg, auth, socket) as any))
      dispatch({ type: GET_POST_DETAIL, payload: newPost as IPost})
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}