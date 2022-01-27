import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { actionRegister, actionRegisterConfirmation } from 'src/app/core/auth/auth.actions';
import { selectRegisterState } from 'src/app/core/core.state';
import { RegisterState } from 'src/app/core/auth/auth.model';
import { AppState } from 'src/app/core/core.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'hmw-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent  implements OnInit, OnDestroy {

  @ViewChild('registerForm') registerForm: NgForm;
  
  private _stateSubscription : Subscription;
  public registerToken : string = null;

  public registerState$: Observable<RegisterState>;
  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef, private notifications: NotificationsService, private router: Router) {

  }

  ngOnInit() {

    this.registerState$ = this.store.pipe(select(selectRegisterState));

    this._stateSubscription = this.activatedRoute.queryParams.subscribe(params => {
      
      if (!this.changeDetector['destroyed']) {

        this.registerToken = params.token;
        
        if(this.registerToken != null) {

          this.store.dispatch(actionRegisterConfirmation( { 
                registerToken : this.registerToken
          }));
        }

        this.changeDetector.detectChanges();
      }
      
    });

    
  }

  onSubmit(): void {

    if (!this.registerForm.valid) {
      return;
    }
    
    var payload = this.registerForm.value;

    if(payload.fullName != "" && payload.email != "" && payload.password != "") {
      this.store.dispatch(actionRegister( payload ));
    }

  }

  ngOnDestroy() {

    this._stateSubscription.unsubscribe();

  }
}
