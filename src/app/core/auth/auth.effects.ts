import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../core.module';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './auth.model';

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
  actionResetFailure,

  actionRegisterConfirmation,
  actionRegisterConfirmationSuccess,
  actionRegisterConfirmationFailure
} from './auth.actions';
import { AUTH_KEY } from '../local-storage/local-storage.service';
import { IButtonItem } from 'src/app/container/dialog/auth-dialog/auth-dialog.component';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogin),
      map((action) => action),
      exhaustMap((action) => {

        return this.authService.login(action.email, action.password).pipe(
          map((user: User) => actionLoginSuccess({ user })),
          catchError((err : any ) => of(actionLoginFailure({ body : err })))
        );

      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLoginSuccess),
      tap((result) => {

        console.log("result : ", result);
        this.authService.currentAuth = {
          isAuthenticated: true,
          loading : false,
          user: result.user
        };

        this.router.navigate(['/etrade']);

      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLoginFailure),
        tap((res) => {

          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false,
          })

          this.authService.popup("Login", res.body.error.message, "error");
         
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLogout),
        tap(() => {

          this.router.navigate(['/home']);

          this.authService.currentAuth = {
            isAuthenticated: false,
            loading : false,
            user: null
          }

        })
      ),
    { dispatch: false }
  );



  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRegister),
      map((action) => action),
      exhaustMap((action) =>

        this.authService.register(action.fullName, action.email, action.password).pipe(
          map((body: any) => actionRegisterSuccess({ body: body })),
          catchError((err : any) => of(actionRegisterFailure({ body : err })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRegisterSuccess),
      tap((res) => {
        
        this.authService.popup("Register", res.body.message, "message");
        
      })
    ),
    { dispatch: false }
  );


  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionRegisterFailure),
        tap((res) => {

          this.authService.popup("Register", res.body.error.message, "error");
        })
      ),
    { dispatch: false }
  );


  registerConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRegisterConfirmation),
      map((action) => action),
      exhaustMap((action) =>

        this.authService.registerConfirmation(action.registerToken).pipe(
          map((user) => actionRegisterConfirmationSuccess({ body: user })),
          catchError((err) => of(actionRegisterConfirmationFailure({ body : err })))
        )
      )
    )
  );

  registerConfirmationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRegisterConfirmationSuccess),
      tap((res) => {

        this.authService.popup("Register", res.body.message, "message");
        this.router.navigate(['/session/login']);
      })
    ),
    { dispatch: false }
  );

  registerConfirmationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionRegisterConfirmationFailure),
        tap((res) => {

          
          let buttons : IButtonItem[] = [{
            name : "OK",
            link : ["/session/login"]
          }]
  
          this.authService.popup("Register", res.body.error.message, "error", buttons);      
        })
      ),
    { dispatch: false }
  );


  forgot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionForgot),
      map((action) => action),
      exhaustMap((action) =>

        this.authService.forgotPassword(action.email).pipe(
          map((res: any) => actionForgotSuccess({ body: res })),
          catchError((err) => of(actionForgotFailure({ body : err })))
        )
      )
    )
  );

  forgotSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionForgotSuccess),
      tap((res : any) => { 
        this.authService.popup("Reset Password", res.body.message, "message");
      })
    ),
    { dispatch: false }
  );

  forgotFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionForgotFailure),
        tap((res) => {

          this.authService.popup("Reset Password", res.body.error.message, "error");

        })
      ),
    { dispatch: false }
  );


  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionReset),
      map((action) => action),
      exhaustMap((action) =>

        this.authService.resetPassword(action.resetToken, action.password).pipe(
          map((res: any) => actionResetSuccess({ body: res })),
          catchError((err) => of(actionResetFailure({ body : err })))
        )
      )
    )
  );

  resetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionResetSuccess),
      tap((res : any) => { 

        let buttons : IButtonItem[] = [{
          name : "OK",
          link : ["/session/login"]
        }]

        this.authService.popup("Reset Password", res.body.message, "message", buttons);
      })
    ),
    { dispatch: false }
  );

  resetFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionResetFailure),
        tap((res) => {

           let buttons : IButtonItem[] = [{
            name : "OK",
            link : ["/session/login"]
          }]
  
          this.authService.popup("Reset Password", res.body.error.message, "error", buttons);          
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
    
  ) { }
}