import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './company-list';

import { CreateStudentModalModule } from '../create-student-modal/create-student-modal.module';


@NgModule({
  declarations: [
    CompanyListPage,
  ],
  imports: [
    CreateStudentModalModule,
    IonicPageModule.forChild(CompanyListPage),
  ],
})
export class CompanyListPageModule {}
