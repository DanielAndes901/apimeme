import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { environment } from 'src/environments/environment';

import {
  routeAnimations,
} from 'src/app/core/core.module';

@Component({
  selector: 'hmw-about',
  templateUrl: './about.component.html',
  animations: [routeAnimations]  
})
export class AboutComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  } 

 
}