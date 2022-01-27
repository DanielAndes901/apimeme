import { Component, Input } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuService, IMenuItem } from 'src/app/services/menu/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hmw-heading',
  templateUrl: './heading.component.html'
})
export class HeadingComponent {
  
  @Input() title = '';
  
  path = '';

  constructor(private menuService : MenuService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
    ).subscribe((event) => {
     this.path = this.router.url.split('?')[0];
    });
  }

  getLabel(path): string {

    // step 0
    let foundedMenuItem = this.menuService.getMenuItems().find(x => x.link === path);

    if (!foundedMenuItem) {
      // step 1
      this.menuService.getMenuItems().map(menu => {
        if (!foundedMenuItem && menu.subs) {foundedMenuItem = menu.subs.find(x => x.link === path); }
      });
      if (!foundedMenuItem) {
        // step 2
        this.menuService.getMenuItems().map(menu => {
          if (menu.subs) {
            menu.subs.map(sub => {
                if (!foundedMenuItem && sub.subs) {foundedMenuItem = sub.subs.find(x => x.link === path); }
              });
          }
        });
        if (!foundedMenuItem) {
          // step 3
          this.menuService.getMenuItems().map(menu => {
            if (menu.subs) {
              menu.subs.map(sub => {
                if (sub.subs) {
                  sub.subs.map(deepSub => {
                    if (!foundedMenuItem && deepSub.subs) {foundedMenuItem = deepSub.subs.find(x => x.link === path); }
                  });
                }
              });
            }
          });
        }
      }
    }

    if (foundedMenuItem) { return foundedMenuItem.name; } else { return 'notFoundInMenu'; }
  }

}
