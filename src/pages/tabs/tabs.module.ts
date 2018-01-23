import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompanyDetailPage } from '../company-detail/company-detail';
import { JobDetailPage } from '../job-detail/job-detail';
import { JobListingPage } from '../job-listing/job-listing';
import { StudentDetailPage } from '../student-detail/student-detail';
import { TabsComponent } from './tabs';

@NgModule({
  declarations: [
    CompanyDetailPage,
    JobDetailPage,
    JobListingPage,
    StudentDetailPage,
    TabsComponent,
  ],
  imports: [
    IonicPageModule.forChild(TabsComponent),
  ],
  entryComponents: [
    CompanyDetailPage,
    JobDetailPage,
    JobListingPage,
    StudentDetailPage,
    TabsComponent,
  ],
})
export class TabsComponentModule {}
