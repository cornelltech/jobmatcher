import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CreateStudentModalModule } from '../create-student-modal/create-student-modal.module'
import { StudentListPage } from './student-list';


@NgModule({
  declarations: [
    StudentListPage,
  ],
  imports: [
    CreateStudentModalModule,
    IonicPageModule.forChild(StudentListPage),
  ],
})
export class StudentListPageModule {}
