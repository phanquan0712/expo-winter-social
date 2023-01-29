
import { IPost } from "../../utils/TypeScript";

export const GET_POST_DETAIL_LOADING = 'GET_POST_DETAIL_LOADING';
export const GET_POST_DETAIL = 'GET_POST_DETAIL';

export interface IStateType {
   isLoad: boolean,
   post: IPost
}

export interface IGetPostDetailLoadingType {
   type: typeof GET_POST_DETAIL_LOADING
   payload: boolean
}

export interface IGetPostDetailType {
   type: typeof GET_POST_DETAIL
   payload: IPost
}

export type IGetDetailPostType = IGetPostDetailLoadingType | IGetPostDetailType