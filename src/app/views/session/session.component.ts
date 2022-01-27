import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { routeAnimations } from 'src/app/core/core.module';

@Component({
  selector: 'hmw-user',
  templateUrl: './session.component.html',
  animations: [routeAnimations]
})
export class SessionComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
  
  }
}
