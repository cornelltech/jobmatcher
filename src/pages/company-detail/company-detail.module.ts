import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDetailPage } from './company-detail';
import { SettingsModalModule } from '../../modals/settings-modal/settings-modal.module';

@NgModule({
  declarations: [
    CompanyDetailPage,
  ],
  imports: [
    SettingsModalModule,
    IonicPageModule.forChild(CompanyDetailPage),
  ],
})
export class CompanyDetailPageModule {}
