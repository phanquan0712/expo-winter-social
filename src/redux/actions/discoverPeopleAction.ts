import { LOADING_SUGGESTION, GET_SUGGESTION_USER , ISuggestionUserType  } from "../types/discoverPeopleType";
import { Dispatch} from "react";
import { getApi } from '../../utils/fetchData';
import { ShowError } from "../../utils/ShowMessage";
export const getDiscoverPeople = (token: string) => async(dispatch: Dispatch<ISuggestionUserType>) => {
   try {
      dispatch({ type: LOADING_SUGGESTION, payload: true })
      const res = await getApi('suggestion_user', token);
      dispatch({ type: GET_SUGGESTION_USER, payload: { users: res.data.users, total: res.data.total} })
      dispatch({ type: LOADING_SUGGESTION, payload: false })
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}
