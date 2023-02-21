import { Dispatch } from 'redux';
import { 
    LOAD_POST_PROFILE,
    GET_POST_PROFILE,
    GET_SAVED_PROFILE,
    IProfilePostType,
} from './../types/profilePostType';
import { IPost } from '../../utils/TypeScript';
import { ShowError } from '../../utils/ShowMessage';
import { IAuth } from '../types/authType';
import { getApi } from '../../utils/fetchData';


export const getPostProfile = (auth: IAuth) => async(dispatch: Dispatch<IProfilePostType>) => {
    try {
        dispatch({ type: LOAD_POST_PROFILE, payload: true });
        const res = await getApi(`/user_posts/${auth.user?._id}`, auth.access_token);
        dispatch({ type: GET_POST_PROFILE, payload: res.data.posts });
        dispatch({ type: LOAD_POST_PROFILE, payload: false });
    } catch(err: any) {
        return ShowError(err.response.data.msg)
    }
}

export const getSavedProfile = (token: string) => async(dispatch: Dispatch<IProfilePostType>) => {
    try {
        dispatch({ type: LOAD_POST_PROFILE, payload: true });
        const res = await getApi(`saved_posts`, token)
        dispatch({ type: GET_SAVED_PROFILE, payload: res.data.posts });
        dispatch({ type: LOAD_POST_PROFILE, payload: false });
    } catch(err: any) {
        return ShowError(err.response.data.msg)
    }
}