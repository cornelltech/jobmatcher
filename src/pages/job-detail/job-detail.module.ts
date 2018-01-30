import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDetailPage } from './job-detail';
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';

@NgModule({
  declarations: [
    JobDetailPage,
  ],
  imports: [
    SettingsModalModule,
    IonicPageModule.forChild(JobDetailPage),
  ],
})
export class JobDetailPageModule {}
