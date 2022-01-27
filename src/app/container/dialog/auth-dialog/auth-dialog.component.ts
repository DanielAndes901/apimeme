import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'hmw-auth-dialog',
  templateUrl: './auth-dialog.component.html'  
})
export class AuthDialogComponent implements OnInit {

  public message : string;
  public title : string = "Session";
  public type : string = "error";

  public buttons : IButtonItem[] = [{
    name: 'OK',
  }]
  
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>, public store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onClick(item) {

    console.log("item : ", item);

    this.dialogRef.close();
    
    if(item.link != null) {
      this.router.navigate(item.link);
    }

    if(item.callback) {
      item.callback(this.store);
    }
  }

}

export interface IButtonItem {

  icon?: string;
  name?: string;
  link?: string[];
  callback? : any;   
}