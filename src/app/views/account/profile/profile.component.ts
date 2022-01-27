import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User, AuthState } from 'src/app/core/auth/auth.model';
import { AuthService } from 'src/app/services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfileSettingState, AccountCloseState } from './profile.model';
import { selectProfileState, selectAccountCloseState } from './profile.selectors';
import { actionAccountClose, actionProfileSetting } from './profile.actions';

import { IButtonItem }  from 'src/app/container/dialog/auth-dialog/auth-dialog.component'
@Component({
  selector: 'hmw-profile',
  templateUrl: './profile.component.html'  
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _subscription : Subscription;
  public currentUser: User;

  public profileGroup: FormGroup;
  public profileState$: Observable<ProfileSettingState>;
  public accountCloseState$: Observable<AccountCloseState>;

  get p() { return this.profileGroup.controls; }
  
  constructor(private formGroup: FormBuilder, private authService: AuthService, public store: Store, private changeDetector: ChangeDetectorRef) {

    this.profileGroup = this.formGroup.group({
      etradeState: [{ value: false, disabled: false }],
      ibState: [{ value: false, disabled: false }],
      demoState: [{ value: false, disabled: false }]
    })
  }

  ngOnInit() {


    this.profileState$ = this.store.pipe(select(selectProfileState));
    this.accountCloseState$ = this.store.pipe(select(selectAccountCloseState));

    this._subscription = this.authService.currentAuth$.subscribe((auth: AuthState) => {

      if (!this.changeDetector['destroyed']) {
        
        this.currentUser = auth.user;

        if(this.currentUser != null) {
          if(this.currentUser.profile != null) {
            this.p.etradeState.setValue(this.currentUser.profile.ETRADE);
            this.p.ibState.setValue(this.currentUser.profile.IB);
            this.p.demoState.setValue(this.currentUser.profile.DEMO);
          }
        }

        this.changeDetector.detectChanges();
      }

    });


  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }

  onCloseAccount() {

    let buttons : IButtonItem[] = [{
      name : "Yes",
      callback : this.onSure
    },
    {
      name : "No",
      callback : null
    }]

    this.authService.popup("Account", "Are you sure to close account?", "", buttons);

  }

  onSure(store) {
    store.dispatch(actionAccountClose({ res: {} }));
  }

  onSubmit() {

    let profile = {
      ETRADE  : this.p.etradeState.value,
      IB : this.p.ibState.value,
      DEMO : this.p.demoState.value
    }  
    
    console.log("profile : ", profile);
    
    this.store.dispatch(actionProfileSetting({ profile: profile }));
  }
}
