import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { GradientCardComponent } from './gradient-card/gradient-card.component';
import { GradientWithRadialProgressCardComponent } from './gradient-with-radial-progress-card/gradient-with-radial-progress-card.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PriceCardComponent } from './price-card/price-card.component';
import { RadialProcessCardComponent } from './radial-process-card/radial-process-card.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    GradientCardComponent,
    GradientWithRadialProgressCardComponent,
    PostCardComponent,
    PriceCardComponent,
    RadialProcessCardComponent
  ],
  imports: [
    CommonModule,
    RoundProgressModule,
    CoreModule
  ],
  providers: [],
  exports: [
    GradientCardComponent,
    GradientWithRadialProgressCardComponent,
    PostCardComponent,
    PriceCardComponent,
    RadialProcessCardComponent
  ]
})

export class ComponentsCardsModule { }
