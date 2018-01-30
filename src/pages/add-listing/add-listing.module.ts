import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddListingPage } from './add-listing';

@NgModule({
  declarations: [
    AddListingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddListingPage),
  ],
})
export class AddListingPageModule {}
