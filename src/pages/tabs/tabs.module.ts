import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// import { CompanyDetailPage } from '../company-detail/company-detail';
import { CompanyDetailPageModule } from '../company-detail/company-detail.module';
import { JobListingPageModule } from '../job-listing/job-listing.module';
import { StudentDetailPageModule } from '../student-detail/student-detail.module';
import { TabsComponent } from './tabs';

@NgModule({
  declarations: [
    TabsComponent,
  ],
  imports: [
    CompanyDetailPageModule,
    JobListingPageModule,
    StudentDetailPageModule,
    IonicPageModule.forChild(TabsComponent),
  ],
  entryComponents: [
    TabsComponent,
  ],
})
export class TabsComponentModule {}
