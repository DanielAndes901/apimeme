import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/container/layout/sidebar/sidebar.service';
import {
  routeAnimations,
} from 'src/app/core/core.module';


@Component({
  selector: 'hmw-account',
  templateUrl: './account.component.html',
  animations: [routeAnimations]  
})
export class AccountComponent implements OnInit {

  sidebar: ISidebar;
  subscription: Subscription;
  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

}
