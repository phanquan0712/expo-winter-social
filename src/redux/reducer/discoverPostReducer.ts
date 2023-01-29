import { GET_POSTS_DISCOVER_LOADING, UPDATE_ONE_POST_DISCOVER, GET_POSTS_DISCOVER, UPDATE_POSTS_DISCOVER, IPostDiscoverType, IStateType } from "../types/discoverPostType";


const initState: IStateType = {
   loading: false,
   posts: [],
   total: 9,
   page: 1,
   firstLoad: false
}

const discoverPostReducer = (state: IStateType = initState, action: IPostDiscoverType) => {
   switch (action.type) {
      case GET_POSTS_DISCOVER_LOADING:
         return {
            ...state,
            loading: action.payload
         }
      case GET_POSTS_DISCOVER:
         return {
            ...state,
            posts: action.payload.posts,
            total: action.payload.total,
            firstLoad: true
         }
      case UPDATE_POSTS_DISCOVER:
         return {
            ...state,
            posts: action.payload.posts,
            total: action.payload.total,
            firstLoad: false,
            page: state.page + 1
         }
      default:
         return state;
   }
}

export default discoverPostReducer;