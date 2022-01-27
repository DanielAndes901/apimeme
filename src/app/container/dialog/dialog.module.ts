import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [
    AuthDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [
    AuthDialogComponent
  ]
})
export class DialogModule { }
