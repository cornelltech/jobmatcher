import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CreateUserModalModule } from '../../modals/create-user-modal/create-user-modal.module'
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';
import { StudentListPage } from './student-list';


@NgModule({
  declarations: [
    StudentListPage,
  ],
  imports: [
    CreateUserModalModule,
    SettingsModalModule,
    IonicPageModule.forChild(StudentListPage),
  ],
})
export class StudentListPageModule {}
