import { IUser } from '../../utils/Typescript';

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

export interface IAuth {
   msg?: string
   access_token?: string
   user?: IUser
}

export interface AuthType {
   user: IUser,
   access_token: string,
   msg?: string
}



export interface IAuthType {
      type: typeof AUTH;
      payload: {
         access_token: string
         user: IUser
      }
}


export interface IUpdateUser {
   type: typeof UPDATE_USER;
   payload: IUser
}