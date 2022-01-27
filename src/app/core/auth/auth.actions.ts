import { createAction, props } from '@ngrx/store';
import { User } from './auth.model'
export const actionLogin = createAction(
  '[Auth] Login',
  props<{ email: string , password : string }>()
);

export const actionLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const actionLoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ body: any }>()
);


export const actionRegister = createAction(
  '[Auth] Register',
  props<{ fullName: string, email: string , password : string }>()
);

export const actionRegisterSuccess = createAction(
  '[Auth] Register Success',
  props<{ body: any }>()
);

export const actionRegisterFailure = createAction(
  '[Auth] Register Failure',
  props<{ body: any }>()
);

export const actionRegisterConfirmation = createAction(
  '[Auth] Register Confirmation',
  props<{ registerToken: string }>()
);

export const actionRegisterConfirmationSuccess = createAction(
  '[Auth] Register Confirmation Success',
  props<{ body: any }>()
);

export const actionRegisterConfirmationFailure = createAction(
  '[Auth] Register Confirmation Failure',
  props<{ body: any }>()
);


export const actionForgot = createAction(
  '[Auth] Forgot',
  props<{ email: string}>()
);

export const actionForgotSuccess = createAction(
  '[Auth] Forgot Success',
  props<{ body: any }>()
);

export const actionForgotFailure = createAction(
  '[Auth] Forgot Failure',
  props<{ body: any }>()
);


export const actionReset = createAction(
  '[Auth] Reset',
  props<{ resetToken : string, password: string}>()
);

export const actionResetSuccess = createAction(
  '[Auth] Reset Success',
  props<{ body: any }>()
);

export const actionResetFailure = createAction(
  '[Auth] Reset Failure',
  props<{ body: any }>()
);


export const actionLogout = createAction('[Auth] Logout');
export const actionLoginRedirect = createAction('[Auth] Login Redirect');