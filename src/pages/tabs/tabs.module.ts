import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompanyDetailPageModule } from '../company-detail/company-detail.module';
import { JobListingPageModule } from '../job-listing/job-listing.module';
import { StudentDetailPageModule } from '../student-detail/student-detail.module';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    CompanyDetailPageModule,
    JobListingPageModule,
    StudentDetailPageModule,
    IonicPageModule.forChild(TabsPage),
  ],
  entryComponents: [
    TabsPage,
  ],
})
export class TabsComponentModule {}
