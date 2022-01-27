import { Component, OnInit, Renderer2, AfterContentInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { routeAnimations } from './core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routeAnimations]
})

export class AppComponent implements OnInit, AfterContentInit {

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit(): void {
   
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}

