import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState, ForgotPwdState, RegisterState, ResetPwdState } from './auth/auth.model';
import { authReducer, registerReducer, forgotPwdReducer, resetPwdReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';


export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  register : registerReducer,
  forgot : forgotPwdReducer,
  reset : resetPwdReducer,
  settings: settingsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(debug);  
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectRegisterState = createFeatureSelector<AppState, RegisterState>(
  'register'
);

export const selectForgotPwdState = createFeatureSelector<AppState, ForgotPwdState>(
  'forgot'
);

export const selectResetPwdState = createFeatureSelector<AppState, ResetPwdState>(
  'reset'
);


export const selectSettingsState = createFeatureSelector<AppState,SettingsState>('settings');
export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
  auth: AuthState;
  register : RegisterState;
  forgot : ForgotPwdState;
  reset : ResetPwdState;
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}