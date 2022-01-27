import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated, selectUser, AppState } from 'src/app/core/core.module';
import { Observable } from 'rxjs';
import { AuthState, User } from 'src/app/core/auth/auth.model';


export interface IMenuItem {

  icon?: string;
  name?: string;
  link?: string;
  newWindow?: boolean;
  visible?: boolean;
  subs?: IMenuItem[];
}

const headerInitialItems = [

  {
    name: "PAGE ONE",
    link: "/page-one",
    visible: true
  },
  {
    name: "PAGE TWO",
    link: "/page-two",
    visible: true
  },
  {
    name: "CONTACT US",
    link: "/about/contact-us",
    visible: true
  }

];


// const FooterItems = [
//   {
//     state: 'about',
//     name: 'HANDLE OM',
//     type: 'link',
//     icon: 'arrow_right_alt',
//   },
//   {
//     state: 'privacy-policy',
//     name: 'DATASIKKERHET',
//     type: 'link',
//     icon: 'arrow_right_alt',
//   },
//   {
//     state: 'faq',
//     name: 'FAQ',
//     type: 'link',
//     icon: 'arrow_right_alt',
//   },
//   {
//     state: 'contact',
//     name: "KONTAKT OSS",
//     type: "link",
//     icon: 'perm_contact_calendar',
//   },

// ]


const footerItems: IMenuItem[] = [
  {
    name: "About Us",
    link: '/about/about-us'
  },
  {
    name: "Privacy Policy",
    link: '/about/privacy-policy'
  },
  {
    name: "Terms Of Service",
    link: '/about/terms-of-service'
  },
  {
    name: "Contact Us",
    link: '/about/contact-us'
  }
]

@Injectable()
export class MenuService {

  

  private currentAuth$: Observable<AuthState>;
  private isAuthenticated$: Observable<boolean>;

  private isAuthenticated: Boolean = false;
  private currentUser: User = null;

  constructor(private store: Store<AppState>, public authService: AuthService) {

    this.currentAuth$ = this.authService.currentAuth$; //this.store.pipe(select(selectAuthState));
    //this.authService.currentAuth$;

    this.currentAuth$.subscribe((state: AuthState) => {
      
      this.currentUser = state.user;
    });

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isAuthenticated$.subscribe((status: Boolean) => {
      this.isAuthenticated = status;
    });

  }


  getMainHeaderItems(): IMenuItem[] {

    return this.getInitialHeaderMenu();
  }


  getMenuItems(): IMenuItem[] {

    return this.getInitialHeaderMenu();

  }

  getHeaderMenuItems() {

    if (this.isAuthenticated) {
      return this.getMainHeaderItems();
    }
    return this.getInitialHeaderMenu();
  }

  getInitialHeaderMenu(): IMenuItem[] {
    return headerInitialItems;
  }

  getFooterMenu(): IMenuItem[] {
    return footerItems;
  }
}