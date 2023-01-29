import { CREATE_NOTIFY, GET_NOTIFY, DELETE_NOTIFY, DELETE_ALL_NOTIFY, UPDATE_SOUND, INotify, INotifyType, IStateType, UPDATE_NOTIFY, LOAD_NOTIFIES } from './../types/notifiesType';


const initState: IStateType = {
   load: false,
   data: [],
   sound: false,
}

const notifyReducer = (state: IStateType = initState, action: INotifyType) => {
   switch(action.type) {
      case LOAD_NOTIFIES: 
         return {
            ...state,
            load: action.payload
         }
      case GET_NOTIFY:
         return  {
            ...state,
            data: action.payload
         }
      case CREATE_NOTIFY: 
         return {
            ...state,
            data: [action.payload, ...state.data]
         }
      case DELETE_NOTIFY: 
         return {
            ...state,
            data: state.data.filter(item => (
               item.id !== action.payload.id || item.url !== action.payload.url
            ))
         }
      case UPDATE_NOTIFY: 
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload._id ? action.payload : item
            ))
         }
      case DELETE_ALL_NOTIFY:
         return initState;
      case UPDATE_SOUND:
         return {
            ...state,
            sound: action.payload
         }
      default: 
         return state;
   }
}

export default notifyReducer;