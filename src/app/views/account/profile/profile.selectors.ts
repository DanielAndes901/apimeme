import { createSelector } from '@ngrx/store';
import { selectAccountState, AccountState } from '../account.state';

export const selectProfileState = createSelector(
  selectAccountState,
  (state: AccountState) => {

    if(state) {
      return state.profileSettingState;
    }

    return null;
  }
);


export const selectAccountCloseState = createSelector(
  selectAccountState,
  (state: AccountState) => {
    
    if(state) {
      return state.accountCloseState;
    }

    return null;
  }
);
