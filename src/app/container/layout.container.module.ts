import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadroomModule } from '@ctrl/ngx-headroom';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeadingComponent } from './layout/heading/heading.component';
import { PageFooterComponent } from './layout/page-footer/page-footer.component';
import { GraphModule } from './graph/graph.module';
import { ComponentsStateButtonModule } from '../components/state-button/components.state-button.module';
import { DialogModule } from './dialog/dialog.module';
import { HomePageOneSliderComponent } from './layout/homePageOneSlider/homePageOneSlider.component';
import { BootstrapModule } from '../components/bootstrap/bootstrap.module';


@NgModule({

  declarations: [

    HeaderComponent,
    HeadingComponent,
    HomePageOneSliderComponent,
    PageFooterComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BootstrapModule,

    ComponentsStateButtonModule,
    GraphModule,
    HeadroomModule,
    PerfectScrollbarModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    
    FormsModule
    
  ],
  exports: [
    PerfectScrollbarModule,
    HomePageOneSliderComponent,
    
    BootstrapModule,
    SharedModule,

    HeaderComponent,
    HeadingComponent,
    PageFooterComponent,
    FooterComponent,
    SidebarComponent,
    GraphModule,
    DialogModule,
    ComponentsStateButtonModule
  ]

})
export class LayoutContainerModule { }