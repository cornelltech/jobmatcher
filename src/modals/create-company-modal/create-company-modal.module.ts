import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyModal } from './create-company-modal';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CreateCompanyModal,
  ],
  imports: [
    IonicPageModule.forChild(CreateCompanyModal),
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateCompanyModal,
  ]
})
export class CreateCompanyModalModule {}
