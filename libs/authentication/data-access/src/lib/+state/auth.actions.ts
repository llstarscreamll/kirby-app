import { Action } from '@ngrx/store';
import { NewAccount } from '../interfaces/new-account';
import { AuthTokens } from '../interfaces/auth-tokens';

export enum AuthActionTypes {
  SignUp = "[Auth] sign up",
  SignUpSuccess = "[Auth] sign up success",
  SignUpError = "[Auth] sign up error",
  LoginWithCredentials = "[Auth] login with credentials",
  LoginSuccess = "[Auth] login success",
  LoginError = "[Auth] login error",
  GetAuthUser = "[Auth] get user",
  GetAuthUserSuccess = "[Auth] get user success",
  GetAuthUserError = "[Auth] get user error",
  Logout = "[Auth] logout",
  LogoutSuccess = "[Auth] logout success",
  CleanErrors = "[Auth] clean errors",
}

export class SignUp {
  public readonly type = AuthActionTypes.SignUp;
  public constructor(public payload: NewAccount) { }
}

export class SignUpSuccess {
  public readonly type = AuthActionTypes.SignUpSuccess;
  public constructor(public payload: AuthTokens) { }
}

export class SignUpError {
  public readonly type = AuthActionTypes.SignUpError;
  public constructor(public payload: any) { }
}

export class LoginWithCredentials implements Action {
  public readonly type = AuthActionTypes.LoginWithCredentials;
  public constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;
  public constructor(public payload: AuthTokens) { }
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

export class CleanErrors implements Action {
  public readonly type = AuthActionTypes.CleanErrors;
  public constructor() { }
}

export type AuthAction = SignUp | SignUpSuccess | SignUpError
  | LoginWithCredentials | LoginSuccess | LoginError
  | GetAuthUser | GetAuthUserSuccess | GetAuthUserError
  | Logout | LogoutSuccess | CleanErrors;

export const fromAuthActions = {
  SignUp, SignUpSuccess, SignUpError,
  LoginWithCredentials, LoginSuccess, LoginError,
  GetAuthUser, GetAuthUserSuccess, GetAuthUserError,
  Logout, LogoutSuccess, CleanErrors
};
