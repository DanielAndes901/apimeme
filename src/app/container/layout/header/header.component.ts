import { Component,  OnInit, OnDestroy,  HostListener } from '@angular/core';
import { MenuService, IMenuItem } from 'src/app/services/menu/menu.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { SidebarService, ISidebar } from '../sidebar/sidebar.service';
import { AuthService } from '../../../services/auth.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'hmw-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  
  public sidebar: ISidebar;
  private subscription: Subscription;
  private currentUrl : string = '';
  public selectedMenu : string = '';

  constructor(
    public menuService: MenuService,
    public sidebarService: SidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scrollToService: ScrollToService,
    public appService: AppService,
    public authService : AuthService) { 

    this.router.events.pipe(

      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
    )
      .subscribe((event) => {

        const path = this.router.url.split('?')[0];
        const paramtersLen = Object.keys(event.snapshot.params).length;

        const pathArr = path.split('/').slice(0, path.split('/').length - paramtersLen);
        this.currentUrl = pathArr.join('/');

        this.selectedMenu = this.findParentInPath(this.currentUrl) || '';
      });

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        window.scrollTo(0, 0);
        this.currentUrl = event.url;

      }
    });

  }

  ngOnInit(): void {

    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSignOut() : void {
    this.authService.logout();
  }

  findParentInPath(path): any {

    const foundedMenuItem = this.menuService.getMenuItems().find((x) => x.link === path);
    if (!foundedMenuItem) {
      if (path.split('/').length > 1) {
        const pathArr = path.split('/');
        return this.findParentInPath(
          pathArr.slice(0, pathArr.length - 1).join('/')
        );
      } else {
        return undefined;
      }
    } else {
      return path;
    }
  }


  isSelected(item : IMenuItem) {

    if(this.selectedMenu == null) {
      return false;
    }

    let strName = "/" + item.name.toLowerCase();
    return this.selectedMenu == strName; 
  }

  menuButtonClick = ( e: { stopPropagation: () => void }, bVisibleMenu: boolean, containerClassnames: string) => {

    if (e) {
      e.stopPropagation();
    }

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(
      !bVisibleMenu,
      this.sidebar.selectedMenuHasSubItems
    );
  }

  onToggleMobileMenuVisible() {

    this.appService.setMobileMenuVisible(!this.appService.getMobileMenuVisible());
  }

  @HostListener('window:click', ['$event'])
  onClick(event : any): void {
    
    this.appService.setMobileMenuVisible(false);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.appService.setMobileMenuVisible(false);
  }

  scrollTo(target: any): void {

    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };

    this.scrollToService.scrollTo(config);
  }

  
}
