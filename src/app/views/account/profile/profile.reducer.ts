import { createReducer, on, Action } from '@ngrx/store';
import { ProfileSettingState, AccountCloseState } from './profile.model';
import { actionProfileSetting, actionProfileSettingSuccess, actionProfileSettingFailure  } from './profile.actions';
import { actionAccountClose, actionAccountCloseSuccess, actionAccountCloseFailure } from './profile.actions';

export const initialProfileSettingState: ProfileSettingState = {
  pending: false
};

const reducerProfile = createReducer(
  initialProfileSettingState,
  on(actionProfileSetting, (state) => (
    { ...state,
      pending : true
    })
  ),
  on(actionProfileSettingSuccess, (state, { result }) => (
    { ...state,
      pending : false
    })
  ),
  on(actionProfileSettingFailure, (state, {error}) => (
    { ...state,
      pending : false
    })
  )
);

export function profileSettingsReducer(state: ProfileSettingState | undefined, action: Action) {
  return reducerProfile(state, action);
}



export const initialAccountCloseState: AccountCloseState = {
  pending: false
};

const reducerAccountClose = createReducer(
  initialAccountCloseState,
  on(actionAccountClose, (state) => (
    { ...state,
      pending : true
    })
  ),
  on(actionAccountCloseSuccess, (state, { res : result }) => (
    { ...state,
      pending : false
    })
  ),
  on(actionAccountCloseFailure, (state, {error}) => (
    { ...state,
      pending : false
    })
  )
);

export function accountCloseReducer(state: AccountCloseState | undefined, action: Action) {
  return reducerAccountClose(state, action);
}