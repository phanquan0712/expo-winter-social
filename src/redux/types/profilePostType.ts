import { IPost } from '../../utils/TypeScript';


export const LOAD_POST_PROFILE = 'LOAD_POST_PROFILE';
export const GET_POST_PROFILE = 'GET_POST_PROFILE';
export const GET_SAVED_PROFILE = 'GET_SAVED_PROFILE';


export interface IProfilePost {
    load: boolean;
    posts: IPost[];
    saved: IPost[];
}


export interface ILoadPostProfile {
    type: typeof LOAD_POST_PROFILE;
    payload: boolean
}

export interface IGetPostProfile {
    type: typeof GET_POST_PROFILE;
    payload: IPost[]
}

export interface IGetSavedProfile {
    type: typeof GET_SAVED_PROFILE;
    payload: IPost[]
}


export type IProfilePostType = ILoadPostProfile | IGetPostProfile | IGetSavedProfile;