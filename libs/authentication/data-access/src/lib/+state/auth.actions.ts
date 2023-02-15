import { Action } from '@ngrx/store';
import { NewAccount, AuthTokens } from '@kirby/authentication/utils';

export enum AuthActionTypes {
  CheckIfAuthenticated = "[Auth] check if authenticated",
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

export class CheckIfUserIsAuthenticated {
  public readonly type = AuthActionTypes.CheckIfAuthenticated;
}
export class SignUp {
  public readonly type = AuthActionTypes.SignUp;
  constructor(public payload: NewAccount) { }
}

export class SignUpSuccess {
  public readonly type = AuthActionTypes.SignUpSuccess;
  constructor(public payload: AuthTokens) { }
}

export class SignUpError {
  public readonly type = AuthActionTypes.SignUpError;
  constructor(public payload: any) { }
}

export class LoginWithCredentials implements Action {
  public readonly type = AuthActionTypes.LoginWithCredentials;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: AuthTokens) { }
}

export class LoginError implements Action {
  public readonly type = AuthActionTypes.LoginError;
  constructor(public payload: any) { }
}

export class GetAuthUser implements Action {
  public readonly type = AuthActionTypes.GetAuthUser;
}

export class GetAuthUserSuccess implements Action {
  public readonly type = AuthActionTypes.GetAuthUserSuccess;
  constructor(public payload: any) { }
}

export class GetAuthUserError implements Action {
  public readonly type = AuthActionTypes.GetAuthUserError;
  constructor(public payload: any) { }
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  public readonly type = AuthActionTypes.LogoutSuccess;
}

export class CleanErrors implements Action {
  public readonly type = AuthActionTypes.CleanErrors;
}

export type AuthAction = CheckIfUserIsAuthenticated | SignUp | SignUpSuccess
  | SignUpError | LoginWithCredentials | LoginSuccess | LoginError | GetAuthUser
  | GetAuthUserSuccess | GetAuthUserError | Logout | LogoutSuccess | CleanErrors;

export const fromAuthActions = {
  CheckIfUserIsAuthenticated, SignUp, SignUpSuccess, SignUpError,
  LoginWithCredentials, LoginSuccess, LoginError,
  GetAuthUser, GetAuthUserSuccess, GetAuthUserError,
  Logout, LogoutSuccess, CleanErrors
};
