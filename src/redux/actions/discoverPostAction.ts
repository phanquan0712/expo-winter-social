import { GET_POSTS_DISCOVER_LOADING, GET_POSTS_DISCOVER, UPDATE_POSTS_DISCOVER, IPostDiscoverType } from "../types/discoverPostType";
import { Dispatch } from "react";
import { getApi } from "../../utils/fetchData";
import { ShowError } from "../../utils/ShowMessage";


export const getPostDiscover = (token: string) => async(dispatch: Dispatch<IPostDiscoverType>) => {
   try {
      dispatch({ type: GET_POSTS_DISCOVER_LOADING, payload: true})
      const res = await getApi('post_discover', token)
      dispatch({ type: GET_POSTS_DISCOVER, payload: res.data})
      dispatch({ type: GET_POSTS_DISCOVER_LOADING, payload: false})
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}