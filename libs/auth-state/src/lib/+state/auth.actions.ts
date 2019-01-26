import { Action } from '@ngrx/store';
import { Entity } from './auth.reducer';

export enum AuthActionTypes {
  LoginWithCredentials = "[Auth] login with credentials",
  LoginSuccess = "[Auth] login success",
  LoginError = "[Auth] login error",
  GetAuthUser = "[Auth] get user",
  GetAuthUserSuccess = "[Auth] get user success",
  GetAuthUserError = "[Auth] get user error",
  Logout = "[Auth] logout",
  LogoutSuccess = "[Auth] logout success",
}

export class LoginWithCredentials implements Action {
  public readonly type = AuthActionTypes.LoginWithCredentials;
  public constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;
  public constructor(public payload: any) { }
}

export class LoginError implements Action {
  public readonly type = AuthActionTypes.LoginError;
  public constructor(public payload: any) { }
}

export class GetAuthUser implements Action {
  public readonly type = AuthActionTypes.GetAuthUser;
  public constructor() { }
}

export class GetAuthUserSuccess implements Action {
  public readonly type = AuthActionTypes.GetAuthUserSuccess;
  public constructor(public payload: any) { }
}

export class GetAuthUserError implements Action {
  public readonly type = AuthActionTypes.GetAuthUserError;
  public constructor(public payload: any) { }
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
  public constructor() { }
}

export class LogoutSuccess implements Action {
  public readonly type = AuthActionTypes.LogoutSuccess;
  public constructor() { }
}

export type AuthAction = LoginWithCredentials
  | LoginSuccess | LoginError
  | GetAuthUser | GetAuthUserSuccess | GetAuthUserError
  | Logout | LogoutSuccess;

export const fromAuthActions = {
  LoginWithCredentials, LoginSuccess, LoginError,
  GetAuthUser, GetAuthUserSuccess, GetAuthUserError,
  Logout, LogoutSuccess
};
