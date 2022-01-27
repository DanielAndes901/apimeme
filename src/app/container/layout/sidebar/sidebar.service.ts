import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ISidebar {
  containerClassnames: string;
  bVisibleMenu: boolean;
  selectedMenuHasSubItems: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  private initialSidebar: ISidebar = {
    containerClassnames: environment.defaultMenuType,
    bVisibleMenu: true,
    selectedMenuHasSubItems: environment.defaultMenuType === 'menu-default',
  };

  private sidebar = new BehaviorSubject<ISidebar>(this.initialSidebar);
  menuHiddenBreakpoint: number = environment.menuHiddenBreakpoint;

  constructor() { }

  getSidebar(): Observable<ISidebar> {
    return this.sidebar.asObservable();
  }

  changeVal(str: string): void {
    const before = this.sidebar.getValue();
    this.sidebar.next({ ...before, containerClassnames: str });
  }

  setContainerClassnames(bVisibleMenu: boolean, selectedMenuHasSubItems: boolean): void {

    let nextClasses = '';

    if (bVisibleMenu) {
      nextClasses = 'menu-default';
    }
    else {
      nextClasses = 'menu-default menu-hidden';
    }

    this.sidebar.next({
      containerClassnames: nextClasses,
      bVisibleMenu: bVisibleMenu,
      selectedMenuHasSubItems,
    });
  }

  addContainerClassname(classname: string, strCurrentClasses: string): void {
    const newClasses = !(strCurrentClasses.indexOf(classname) > -1)
      ? strCurrentClasses + ' ' + classname
      : strCurrentClasses;
    const before = this.sidebar.getValue();
    this.sidebar.next({ ...before, containerClassnames: newClasses });
  }

  changeDefaultClassnames(strCurrentClasses: string): void {
    const before = this.sidebar.getValue();
    this.sidebar.next({ ...before, containerClassnames: strCurrentClasses });
  }

  changeSelectedMenuHasSubItems(hasSubMenu: boolean = true): void {
    const before = this.sidebar.getValue();
    this.sidebar.next({ ...before, selectedMenuHasSubItems: hasSubMenu });
  }

  clickOnMobileMenu = (strCurrentClasses: string) => {
    const before = this.sidebar.getValue();
    const currentClasses = strCurrentClasses
      ? strCurrentClasses
        .split(' ')
        .filter((x) => x !== '' && x !== 'sub-show-temporary')
      : [];
    let nextClasses = '';
    if (currentClasses.includes('main-show-temporary')) {
      nextClasses = currentClasses
        .filter((x) => x !== 'main-show-temporary')
        .join(' ');
    } else {
      nextClasses = currentClasses.join(' ') + ' main-show-temporary';
    }
    this.sidebar.next({
      ...before,
      containerClassnames: nextClasses,
      bVisibleMenu: false,
    });
  }
}
