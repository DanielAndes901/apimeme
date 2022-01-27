import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { profileSettingsReducer, accountCloseReducer } from './profile/profile.reducer';
import { ProfileSettingState, AccountCloseState } from './profile/profile.model';


export const FEATURE_NAME = 'account';
export const selectAccountState = createFeatureSelector<AccountState>(
  FEATURE_NAME
);

export const reducers: ActionReducerMap<AccountState> = {
  profileSettingState: profileSettingsReducer,
  accountCloseState:  accountCloseReducer
};

export interface AccountState {
  profileSettingState: ProfileSettingState;
  accountCloseState : AccountCloseState;
}