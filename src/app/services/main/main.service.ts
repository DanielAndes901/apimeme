import { Injectable, EventEmitter } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth.service';
import { SYSTEM_STATE, AuthState } from '../../core/auth/auth.model';
import { LocalStorageService } from '../../core/core.module';

@Injectable({
  providedIn: 'root'
})

export class MainService implements OnInit, OnDestroy {

  private selectedBatch: any;

  public eventForSystemStateUpdate: EventEmitter<SYSTEM_STATE> = new EventEmitter();
 
  constructor(

    private localStorageService: LocalStorageService,
    private authService: AuthService) {


    this.authService.currentAuth$.subscribe((auth: AuthState) => {

      if (auth.isAuthenticated) {

        if (auth.user != null) {

          let token = auth.user.token;
        }
      }

    });

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {

  }


  public setSelectedBatch(batch) {

    this.selectedBatch = batch;

  }

  public getSelectedBatch() {
    return this.selectedBatch;
  }
}