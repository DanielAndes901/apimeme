import { actionProfileSetting, actionProfileSettingSuccess, actionProfileSettingFailure } from './profile.actions';
import { actionAccountClose, actionAccountCloseSuccess, actionAccountCloseFailure } from './profile.actions';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import {
  catchError,
  exhaustMap,
  map
} from 'rxjs/operators';
import { AuthService } from 'src/app/services';


@Injectable()
export class ProfileSettingEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }


  profileSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProfileSetting),
      map((action) => action),
      exhaustMap((action) => 

        this.authService.setProfile(action.profile).pipe(

          map((result) => actionProfileSettingSuccess({ result })),
          catchError((error) => of(actionProfileSettingFailure({ error })))
        )

      )
    )
  );

  profileSettingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProfileSettingSuccess),
      map((res : any) => {
        
        let returnUrl = res.result.returnUrl;
        let auth = JSON.parse(JSON.stringify(this.authService.currentAuth));
        
        console.log("res.result.profile : ", res.result.profile);
        
        auth.user.profile = res.result.profile;
        this.authService.currentAuth = auth;
        
        this.router.navigate([returnUrl]);

      })
    ),
    { dispatch: false }
  );

  profileSettingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionProfileSettingFailure),
      map((result) => {

      })
    ),
    { dispatch: false }
  );

  accountClose$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionAccountClose),
      map((action) => action),
      exhaustMap((action) => 

        this.authService.closeAccount().pipe(

          map((result) => actionAccountCloseSuccess({ res : result })),
          catchError((error) => of(actionAccountCloseFailure({ error })))
        )

      )
    )
  );

  accountCloseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionAccountCloseSuccess),
      map((res : any) => {
        this.authService.logout();
      })
    ),
    { dispatch: false }
  );

  accountCloseFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionAccountCloseFailure),
      map((result) => {

      })
    ),
    { dispatch: false }
  );

}
