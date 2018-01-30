import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyListPage } from './company-list';

import { CreateUserModalModule } from '../../modals/create-user-modal/create-user-modal.module';
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';


@NgModule({
  declarations: [
    CompanyListPage,
  ],
  imports: [
    CreateUserModalModule,
    SettingsModalModule,
    IonicPageModule.forChild(CompanyListPage),
  ],
})
export class CompanyListPageModule {}
