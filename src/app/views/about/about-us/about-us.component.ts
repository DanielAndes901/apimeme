import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { environment } from 'src/environments/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'hmw-about-us',
  templateUrl: './about-us.component.html'  
})

export class AboutUsComponent  implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(private scrollToService: ScrollToService) {}

  ngOnInit(): void {
    
    
  }

 

  scrollTo(target): void {

    console.log("target : ", target);
    
    const config: ScrollToConfigOptions = {
      target,
      offset: 0
    };

    this.scrollToService.scrollTo(config);
  }
}