import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanySelectPage } from './company-select';

@NgModule({
  declarations: [
    CompanySelectPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(CompanySelectPage),
  ],
})
export class CompanySelectPageModule {}
