import { IUser } from '../../utils/Typescript';

export const LOAD_AUTH = 'LOAD_AUTH';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

export interface IAuth {
   msg?: string
   access_token?: string
   user?: IUser
}

export interface AuthType {
   load?: boolean,
   user: IUser,
   access_token: string,
   msg?: string
}

export interface ILoadAuthType {
   type: typeof LOAD_AUTH;
   payload: boolean
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