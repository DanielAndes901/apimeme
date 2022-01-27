import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AboutComponent } from './about.component';

import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

import { LayoutContainerModule } from 'src/app/container/layout.container.module';

@NgModule({
  declarations: [AboutUsComponent, PrivacyPolicyComponent, FaqComponent, ContactUsComponent, AboutComponent, TermsOfServiceComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    ComponentsStateButtonModule,
    
    LayoutContainerModule,
    ComponentsCarouselModule,
    TabsModule.forRoot(),

    ScrollToModule.forRoot(),
  ]
})
export class AboutModule { }