import { createAction, props } from '@ngrx/store';

export const actionProfileSetting = createAction(
  '[ProfileSetting] Profile Settings',
  props<{ profile: any }>()
);

export const actionProfileSettingSuccess = createAction(
  '[ProfileSetting] Profile Settings Success',
  props<{ result: any }>()
);

export const actionProfileSettingFailure = createAction(
  '[ProfileSetting] Profile Settings Failure',
  props<{ error: any }>()
);


export const actionAccountClose = createAction(
  '[ AccountClose ] Account Close',
  props<{ res: any }>()
);

export const actionAccountCloseSuccess = createAction(
  '[ AccountClose ] Account Close Success',
  props<{ res: any }>()
);

export const actionAccountCloseFailure = createAction(
  '[ AccountClose ] Account Close Failure',
  props<{ error: any }>()
);