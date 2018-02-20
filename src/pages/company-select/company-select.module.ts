import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanySelectPage } from './company-select';
import { CreateCompanyModalModule } from '../../modals/create-company-modal/create-company-modal.module';

@NgModule({
  declarations: [
    CompanySelectPage,
  ],
  imports: [
    CreateCompanyModalModule,
    IonicPageModule.forChild(CompanySelectPage),
  ],
})
export class CompanySelectPageModule {}
