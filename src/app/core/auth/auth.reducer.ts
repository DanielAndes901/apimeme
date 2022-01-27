import { AuthState, ForgotPwdState, RegisterState, ResetPwdState } from './auth.model';
import {
  actionLogin,
  actionLogout,
  actionLoginSuccess,
  actionLoginFailure,

  actionRegister,
  actionRegisterSuccess,
  actionRegisterFailure,

  actionForgot,
  actionForgotSuccess,
  actionForgotFailure,

  actionReset,
  actionResetSuccess,
  actionResetFailure

} from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  loading: false
};

const reducer = createReducer(
  initialState,
  on(actionLogin, (state) => (
    {
      ...state,
      loading: true,
    })
  ),
  on(actionLoginSuccess, (state, { user }) => (
    {
      ...state,
      loading: false,
      isAuthenticated: true,
      user
    })
  ),
  on(actionLoginFailure, (state, { body : error }) => (
    {
      ...state,
      loading: false,
      isAuthenticated: false,
      error
    })
  ),


  on(actionLogout, (state) => (
    {
      ...state,
      isAuthenticated: false
    }))
);

export function authReducer(state: AuthState | undefined, action: Action) {

  return reducer(state, action);
}

export const initialRegisterState: RegisterState = {
  loading: false,
  sendRequestToRegister : false
};

const reducerRegister = createReducer(
  
  initialRegisterState,
  on(actionRegister, (state) => (
    {
      ...state,
      loading: true,
      sendRequestToRegister: false
    })
  ),
  on(actionRegisterSuccess, (state, { }) => (
    {
      ...state,
      loading: false,
      sendRequestToRegister: true
    })
  ),
  on(actionRegisterFailure, (state, { body : error }) => (
    {
      ...state,
      loading: false,
      sendRequestToRegister: false,
      error
    })
  ),
);


export function registerReducer(state: RegisterState | undefined, action: Action) {

  return reducerRegister(state, action);
}


export const initialForgotPwdState: ForgotPwdState = {
  loading: false,
  sendRequestToReset : false
};

const reducerForgotPwd = createReducer(
  
  initialForgotPwdState,
  on(actionForgot, (state) => (
    {
      ...state,
      loading: true,
      sendRequestToReset: false
    })
  ),
  on(actionForgotSuccess, (state, { }) => (
    {
      ...state,
      loading: false,
      sendRequestToReset: true
    })
  ),
  on(actionForgotFailure, (state, { body : error }) => (
    {
      ...state,
      loading: false,
      sendRequestToReset: false,
      error
    })
  )

);


export function forgotPwdReducer(state: ForgotPwdState | undefined, action: Action) {

  return reducerForgotPwd(state, action);
}

export const initialResetPwdState: ResetPwdState = {
  loading: false,
  requestSettled : false
};

const reducerResetPwd = createReducer(
  
  initialResetPwdState,

  on(actionReset, (state) => (
    {
      ...state,
      loading: true,
      requestSettled: false
    })
  ),
  on(actionResetSuccess, (state, { }) => (
    {
      ...state,
      loading: false,
      requestSettled: true
    })
  ),
  on(actionResetFailure, (state, { body : error }) => (
    {
      ...state,
      loading: false,
      requestSettled: false,
      error
    })
  )

);

export function resetPwdReducer(state: ResetPwdState | undefined, action: Action) {

  return reducerResetPwd(state, action);
}