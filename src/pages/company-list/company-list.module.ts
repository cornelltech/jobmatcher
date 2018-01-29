import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './company-list';

import { CreateUserModalModule } from '../create-user-modal/create-user-modal.module';


@NgModule({
  declarations: [
    CompanyListPage,
  ],
  imports: [
    CreateUserModalModule,
    IonicPageModule.forChild(CompanyListPage),
  ],
})
export class CompanyListPageModule {}
