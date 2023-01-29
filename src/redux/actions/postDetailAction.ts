import { GET_POST_DETAIL, GET_POST_DETAIL_LOADING,  IGetDetailPostType } from "../types/postDetailType";
import { Dispatch } from "react";
import { getApi } from "../../utils/fetchData";
import { IPost } from "../../utils/TypeScript";
import { ShowError } from "../../utils/ShowMessage";

export const getDetailPost = (id: string, token: string) => async(dispatch: Dispatch<IGetDetailPostType>) => {
   try {
      dispatch({ type: GET_POST_DETAIL_LOADING, payload: true })
      const res = await getApi(`posts/${id}`, token)
      dispatch({ type: GET_POST_DETAIL, payload: res.data.post })
      dispatch({ type: GET_POST_DETAIL_LOADING, payload: false })
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}