import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { AUTH_KEY } from '../core/local-storage/local-storage.service';
import { AuthState } from '../core/auth/auth.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent, IButtonItem } from 'src/app/container/dialog/auth-dialog/auth-dialog.component';
import { actionLogout } from '../core/core.module';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentAuthSubject$: BehaviorSubject<AuthState>;
  public currentAuth$: Observable<AuthState>;

  set currentAuth(auth: AuthState) {

    this.localStorageService.setItem(AUTH_KEY, auth);

    this.currentAuthSubject$.next(auth);
  }

  get currentAuth(): AuthState {
    return this.currentAuthSubject$.value;
  }


  constructor(private localStorageService: LocalStorageService, private dialog: MatDialog, private store: Store, private http: HttpClient, private router: Router) {


    let savedAuth: AuthState = localStorageService.getItem(AUTH_KEY);

    if (savedAuth == null) {
      savedAuth = {
        isAuthenticated: false,
        loading : false,
        user: null
      }
    }

    this.currentAuthSubject$ = new BehaviorSubject<AuthState>(savedAuth);
    this.currentAuth$ = this.currentAuthSubject$.asObservable();

  }


  public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${environment.urlForMain}/signin`, { email, password });
  }

  public checkTokenExpiration() {


    if (this.currentAuth.user != null) {

      let token = this.currentAuth.user.token;

      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      let time = Math.floor((new Date).getTime() / 1000);

      let expired = (time >= expiry);

      if (expired == true) {
        this.logout();
      }
    }

  }

  public logout() {

    this.store.dispatch(actionLogout());
  }

  public loadInfo(symbol: string) {

    if (this.currentAuth.user != null) {

      let token = this.currentAuth.user.token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      return this.http.post<any>(`${environment.urlForMain}/analyzer/loadinfo`, { symbol: symbol }, httpOptions);
    }

    return throwError('You are not authorized.');
  }


  public register(fullName: string, email: string, password: string) {

    return this.http.post<any>(`${environment.urlForMain}/signup`, { fullName, email, password });
  }

  public registerConfirmation(registerToken: string) {
    return this.http.post<any>(`${environment.urlForMain}/signup-confirmation`, { registerToken });
  }

  public forgotPassword(email: string) {

    return this.http.post<any>(`${environment.urlForMain}/forgotPassword`, { email });
  }

  public changePassword(email: string, password: string, newPassword: string) {
    return this.http.post<any>(`${environment.urlForMain}/changePassword`, { email, password, newPassword });
  }

  public resetPassword(token: string, newPassword: string) {
    return this.http.post<any>(`${environment.urlForMain}/resetPassword`, { token, newPassword });
  }

  public closeAccount() {

    if (this.currentAuth.user != null) {

      let token = this.currentAuth.user.token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      return this.http.post<any>(`${environment.urlForMain}/closeAccount`, { email : this.currentAuth.user.email }, httpOptions);
    }
    
    return throwError('You are not authorized.');
  }



  public setProfile(profile: any) {


    if (this.currentAuth.user != null) {

      let token = this.currentAuth.user.token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      return this.http.post<any>(`${environment.urlForMain}/setProfile`, { profile }, httpOptions);
    }

    return throwError('You are not authorized.');
  }

  public popup(title : string, message : string, type : string, buttons : IButtonItem[] = null) {

    const dialogRef = this.dialog.open<AuthDialogComponent, boolean>(
      AuthDialogComponent, {
      width: '480px',
    });


    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.type = type;

    
    if(buttons != null) {
      dialogRef.componentInstance.buttons = buttons;
    }

    if (message == undefined) {
      dialogRef.componentInstance.message = "Internal server error.";
    }
    else {
      dialogRef.componentInstance.message = message;
    }

    return dialogRef.afterClosed();
  }

}
