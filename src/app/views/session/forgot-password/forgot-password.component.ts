import { Component, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { actionForgot } from 'src/app/core/auth/auth.actions';
import { ForgotPwdState } from 'src/app/core/auth/auth.model';
import { AppState, selectForgotPwdState } from 'src/app/core/core.state';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'hmw-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit   {

  @ViewChild('passwordForm') passwordForm: NgForm;
  
  public forgotPwdState$: Observable<ForgotPwdState>;

  constructor(private store: Store<AppState>, private authService: AuthService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() : void {
    this.forgotPwdState$ = this.store.pipe(select(selectForgotPwdState));
  }

  onSubmit(): void {
    
    if (!this.passwordForm.valid) {
      return;
    }
    
    var payload = this.passwordForm.value;
    
    if(payload.email != "") {
      this.store.dispatch(actionForgot( payload ));
    }
  }

}
