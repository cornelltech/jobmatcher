import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateStudentModal } from './create-student-modal';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CreateStudentModal,
  ],
  imports: [
    IonicPageModule.forChild(CreateStudentModal),
    ReactiveFormsModule
  ],
  entryComponents: [
    CreateStudentModal,
  ]
})
export class CreateStudentModalModule {}
