import { Component, OnInit, ViewChild } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
@Component({
  selector: 'hmw-contact-us',
  templateUrl: './contact-us.component.html'  
})

export class ContactUsComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild('contactForm') contactForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(private notifications: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {

    if (!this.contactForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

  }

}
