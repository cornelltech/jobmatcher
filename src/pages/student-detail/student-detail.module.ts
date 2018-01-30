import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDetailPage } from './student-detail';
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';

@NgModule({
  declarations: [
    StudentDetailPage,
  ],
  imports: [
    SettingsModalModule,
    IonicPageModule.forChild(StudentDetailPage),
  ],
})
export class StudentDetailPageModule {}
