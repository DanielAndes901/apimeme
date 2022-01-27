import { Component, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { actionLogin } from 'src/app/core/auth/auth.actions';
import { AuthState } from 'src/app/core/auth/auth.model';
import { AppState, selectAuthState } from 'src/app/core/core.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmw-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  public loginState$: Observable<AuthState>;


  constructor(private store: Store<AppState>, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {

    this.loginState$ = this.store.pipe(select(selectAuthState));
  }

  onSubmit(): void {
    
    if (!this.loginForm.valid) {
      return;
    }
    
    var payload = this.loginForm.value;
    
    if(payload.email != "" && payload.password != "") {
      this.store.dispatch(actionLogin( payload ));
    }

  }
}
