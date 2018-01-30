import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddListingPageModule } from '../add-listing/add-listing.module';
import { CompanyDetailPageModule } from '../company-detail/company-detail.module';
import { CompanyListPageModule } from '../company-list/company-list.module';
import { JobListingPageModule } from '../job-listing/job-listing.module';
import { StudentDetailPageModule } from '../student-detail/student-detail.module';
import { StudentListPageModule } from '../student-list/student-list.module';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    AddListingPageModule,
    CompanyDetailPageModule,
    CompanyListPageModule,
    JobListingPageModule,
    StudentDetailPageModule,
    StudentListPageModule,
    IonicPageModule.forChild(TabsPage),
  ],
  entryComponents: [
    TabsPage,
  ],
})
export class TabsPageModule {}
