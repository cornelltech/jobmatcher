import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobListingPage } from './job-listing';
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';

@NgModule({
  declarations: [
    JobListingPage,
  ],
  imports: [
    SettingsModalModule,
    IonicPageModule.forChild(JobListingPage),
  ],
})
export class JobListingPageModule {}
