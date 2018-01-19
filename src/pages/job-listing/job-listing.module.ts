import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobListingPage } from './job-listing';

@NgModule({
  declarations: [
    JobListingPage,
  ],
  imports: [
    IonicPageModule.forChild(JobListingPage),
  ],
})
export class JobListingPageModule {}
