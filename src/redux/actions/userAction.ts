import { Dispatch } from "react";
import { patchApi } from "../../utils/fetchData";
import { ShowError, ShowSuccess } from "../../utils/ShowMessage";
import { IUser } from "../../utils/TypeScript";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { GET_USER, LOAD_USER_POST, IUpdateProfile, FOLLOW, IProfileType, GET_POST_USER } from "../types/userType";

export const follow = (user: IUser,  token: string, idPeopleFollow: string) => async (dispatch: Dispatch<IProfileType | IAuthType>) => {
   console.log({
      user, 
      idPeopleFollow
   });
   
   try {
      let newUser;
      if(user.following.every(item => item !== idPeopleFollow)) {
         newUser = {
            ...user,
            following: [...user.following, idPeopleFollow]
         }
      } else {
         return ShowError("You are already following this person")
      }
      dispatch({
         type: AUTH,
         payload: {
            access_token: token,
            user: newUser
         }
      })
      const res = await patchApi(`/user/${idPeopleFollow}/follow`, {}, token);
      return ShowSuccess(res.data.msg)
   } catch(err: any) {
      return ShowError(err.response.data.msg)
   }
}