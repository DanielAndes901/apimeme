import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SessionComponent } from './session.component';
import { SessionRoutingModule } from './session.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { LayoutContainerModule } from 'src/app/container/layout.container.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SessionComponent,
    ResetPasswordComponent
  ],
  
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    SharedModule,
   
    LayoutContainerModule,
    
    ComponentsStateButtonModule
  ],
  providers : [
  ]
})
export class SessionModule { }
