import { 
    LOAD_POST_PROFILE,
    GET_POST_PROFILE,
    GET_SAVED_PROFILE,
    IProfilePost,
    IProfilePostType
} from './../types/profilePostType';


const initState: IProfilePost = {
    load: false,
    posts: [],
    saved: []   
}


const profilePostReducer = (state = initState, action: IProfilePostType) => {
    switch (action.type) {
        case LOAD_POST_PROFILE:
            return {
                ...state, 
                load: action.payload
            }
        case GET_POST_PROFILE:
            return {
                ...state,
                posts: action.payload
            }
        case GET_SAVED_PROFILE:
            return {
                ...state,
                saved: action.payload
            }
        default:
            return state;
    }
}

export default profilePostReducer;