import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserModal } from './create-user-modal';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CreateUserModal,
  ],
  imports: [
    IonicPageModule.forChild(CreateUserModal),
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateUserModal,
  ]
})
export class CreateUserModalModule {}
