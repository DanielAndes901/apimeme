import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';

import { ViewsComponent } from './views.component';
import { ViewRoutingModule } from './views.routing';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { LayoutContainerModule } from 'src/app/container/layout.container.module';
import { EditorFormComponent } from './page-two/editor-form/editor-form.component';
import { ImageFormComponent } from './page-two/image-form/image-form.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    PageOneComponent,
    PageTwoComponent,
    ViewsComponent,
    EditorFormComponent,
    ImageFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsCarouselModule,
    LayoutContainerModule,
    ViewRoutingModule,
    ScrollToModule.forRoot(),
  ]
})
export class ViewsModule { }
