import { createAction, props } from '@ngrx/store';

import { NewAccount, AuthTokens } from '@kirby/authentication/utils';

export const CheckIfUserIsAuthenticated = createAction('[Auth] check');
export const SignUp = createAction('[Auth] sign up', props<{ payload: NewAccount }>());
export const SignUpSuccess = createAction('[Auth] sign up ok', props<{ payload: AuthTokens }>());
export const SignUpError = createAction('[Auth] sign up error', props<{ payload: any }>());
export const LoginWithCredentials = createAction(
  '[Auth] login',
  props<{ payload: { email: string; password: string } }>()
);
export const LoginSuccess = createAction('[Auth] login ok', props<{ payload: AuthTokens }>());
export const LoginError = createAction('[Auth] login error', props<{ payload: any }>());
export const GetAuthUser = createAction('[Auth] get user');
export const GetAuthUserSuccess = createAction('[Auth] get user ok', props<{ payload: any }>());
export const GetAuthUserError = createAction('[Auth] get user error', props<{ payload: any }>());
export const Logout = createAction('[Auth] logout');
export const LogoutSuccess = createAction('[Auth] logout ok');
export const CleanErrors = createAction('[Auth] clean errors');
