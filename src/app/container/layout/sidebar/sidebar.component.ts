import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarService, ISidebar } from './sidebar.service';
import { MenuService, IMenuItem } from 'src/app/services/menu/menu.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/core/auth/auth.model'

@Component({
  selector: 'hmw-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {

  selectedParentMenu = '';
  viewingParentMenu = '';
  currentUrl: string;

  sidebar: ISidebar;
  subscription: Subscription;
  closedCollapseList = [];

  currentUser: User;

  constructor(
    public menuService: MenuService,
    private router: Router,
    private sidebarService: SidebarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {

    this.currentUser = this.authService.currentAuth.user;

    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );

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
      });

    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {

      this.selectMenu();
      this.toggle();
      this.sidebarService.setContainerClassnames(
        true,
        this.sidebar.selectedMenuHasSubItems
      );
      window.scrollTo(0, 0);
    });
  }

  getSubMenuItems(): IMenuItem[] {

    let menuItems = this.menuService.getMenuItems();

    for (let i in menuItems) {
      let menuItem = menuItems[i];
      if (menuItem.link == this.selectedParentMenu) {
        return menuItem.subs;
      }
    }
    return [];
  }

  async ngOnInit(): Promise<void> {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectMenu(): void {

    this.selectedParentMenu = this.findParentInPath(this.currentUrl) || '';
    this.isCurrentMenuHasSubItem();
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


  isCurrentMenuHasSubItem(): boolean {

    const menuItem = this.menuService.getMenuItems().find(
      (x) => x.link === this.selectedParentMenu
    );

    const isCurrentMenuHasSubItem = menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;

    if (isCurrentMenuHasSubItem !== this.sidebar.selectedMenuHasSubItems) {

      if (!isCurrentMenuHasSubItem) {
        this.sidebarService.setContainerClassnames(false, false);
      } else {
        this.sidebarService.setContainerClassnames(true, true);
      }
    }

    return isCurrentMenuHasSubItem;
  }

  toggle(): void {

    const { containerClassnames, bVisibleMenu } = this.sidebar;

    const currentClasses = containerClassnames.split(' ').filter((x) => x !== '');

    if (currentClasses.includes('menu-hidden') && bVisibleMenu) {
      this.sidebarService.setContainerClassnames(
        true,
        this.sidebar.selectedMenuHasSubItems
      );
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      if (!(bVisibleMenu && !this.sidebar.selectedMenuHasSubItems)) {
        this.sidebarService.setContainerClassnames(
          false,
          this.sidebar.selectedMenuHasSubItems
        );
      }
    }
  }


  getMenuClassesForResize(classes: string): string[] {
    let nextClasses = classes.split(' ').filter((x: string) => x !== '');
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      nextClasses.push('menu-hidden');
    }
    else {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');

      if (nextClasses.includes('menu-default') && nextClasses.includes('menu-hidden')) {
        nextClasses = nextClasses.filter(
          (x: string) => x !== 'menu-hidden'
        );
      }
    }

    console.log("nextClasses : ", nextClasses);
    return nextClasses;
  }


  @HostListener('window:resize', ['$event'])
  handleWindowResize(event): void {
    
    if (event && !event.isTrusted) {
      return;
    }
    
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      this.sidebarService.setContainerClassnames(false, this.sidebar.selectedMenuHasSubItems);  
    }
    else {
      this.sidebarService.setContainerClassnames(true, this.sidebar.selectedMenuHasSubItems);  
    }

    this.isCurrentMenuHasSubItem();
  }

  menuClicked(e: MouseEvent): void {
    e.stopPropagation();
  }

}
