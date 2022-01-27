import { Component, OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { actionReset } from 'src/app/core/auth/auth.actions';
import { ResetPwdState } from 'src/app/core/auth/auth.model';
import { AppState, selectResetPwdState } from 'src/app/core/core.state';
import { Observable, Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/core/core.module';

@Component({
  selector: 'hmw-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy  {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild('resetForm') resetForm: NgForm;
  
  public resetPwdState$: Observable<ResetPwdState>;

  private _stateSubscription : Subscription;
  public resetToken : string = '';

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.resetPwdState$ = this.store.pipe(select(selectResetPwdState));

    this._stateSubscription = this.activatedRoute.queryParams.subscribe(params => {
        this.resetToken = params.token;      
    });

  }

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }

  onSubmit(): void {
    
    if (!this.resetForm.valid) {
      return;
    }
    
    var payload = this.resetForm.value;
    
    if(payload.newPassword != "" && payload.confirmPassword != "") {

      if(payload.newPassword == payload.confirmPassword) {
        this.store.dispatch(actionReset( { resetToken : this.resetToken, password : payload.newPassword }));
      }
      else {
        this.authService.popup("Reset Password", "Confirmation is not valid.", "error");
      }
     
    }
  }
}
