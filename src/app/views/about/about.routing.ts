import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
    {
        path: '', component: AboutComponent,
        children: [
            { path: '', redirectTo: 'about-us', pathMatch: 'full' },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-of-service', component: TermsOfServiceComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'contact-us', component: ContactUsComponent },
        ]        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule {}