import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CreateUserModalModule } from '../create-user-modal/create-user-modal.module'
import { StudentListPage } from './student-list';


@NgModule({
  declarations: [
    StudentListPage,
  ],
  imports: [
    CreateUserModalModule,
    IonicPageModule.forChild(StudentListPage),
  ],
})
export class StudentListPageModule {}
