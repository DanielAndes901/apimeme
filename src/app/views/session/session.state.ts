import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../core/core.module';
import { authReducer } from '../../core/auth/auth.reducer';
import { AuthState } from '../../core/auth/auth.model';

export const FEATURE_NAME = 'session';

export const selectExamples = createFeatureSelector<State, SessionState>(
  FEATURE_NAME
);

export const reducers: ActionReducerMap<SessionState> = {
  login: authReducer
};

export interface SessionState {
  login: AuthState;
}

export interface State extends AppState {
  session: SessionState;
}
