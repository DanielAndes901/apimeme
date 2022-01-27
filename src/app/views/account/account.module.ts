import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account.routing';
import { FEATURE_NAME, reducers } from './account.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileSettingEffects } from './profile/profile.effects';
import { SettingsComponent } from './settings/settings.component'
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProfileComponent,
    AccountComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      ProfileSettingEffects      
    ]),
  ]
})
export class AccountModule { }
