import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { selectIsAuthenticated, AppState } from 'src/app/core/core.module';

import { routeAnimations } from 'src/app/core/core.module';
import { MainService } from '../services';

@Component({
  selector: 'hmw-views',
  templateUrl: './views.component.html',
  animations: [routeAnimations]
})
export class ViewsComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(public mainService: MainService, public menuService: MenuService, private renderer: Renderer2, public  appService : AppService, private elRef: ElementRef, private store: Store<AppState>, public authService : AuthService) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  ngOnInit(): void {

  }

  onLogout() {

    this.appService.setMobileMenuVisible(false);
    this.authService.logout();
    
  }

  onActivate(event: any) {

    window.scroll(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any): void {

    this.appService.setMobileMenuVisible(false);  
  }

}
