import { Component } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'hmw-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent  {

  constructor(public menuService: MenuService, public appService: AppService) { }

}
