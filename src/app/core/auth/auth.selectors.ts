import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../core.state';
import { AuthState, User } from './auth.model';


export const selectIsAuthenticated = createSelector(
  
  selectAuthState,
  (state: AuthState) => {
   
    if(state != null) {
      return state.isAuthenticated;
    }
    return false;    
  }
);

export const selectUser = createSelector(
  
  selectAuthState,
  (state: AuthState) => {
   
    if(state != null) {
      return state.user;
    }
    return null;
  }
);

export const selectDemoEnabled = createSelector(
  
  selectUser,
  (user: User) => {
   
    if(user != null) {
      return user.profile.DEMO;
    }
    
    return false;
  }
);

export const selectUserToken = createSelector(
  
  selectAuthState,
  (state: AuthState) => {
   
    if(state.user != undefined) {
        return state.user.token;
    }

    return null;
  }
);


export const selectUserEmail = createSelector(
  selectAuthState,
  (state: AuthState) => {

    if(state.user != undefined) {
        return state.user.email;
    }
    return null;
  }
);