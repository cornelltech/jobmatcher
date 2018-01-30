import { NgModule } from '@angular/core';
import { SettingsModal } from './settings-modal';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SettingsModal,
  ],
  imports: [
    IonicPageModule.forChild(SettingsModal),
  ],
  entryComponents: [
    SettingsModal,
  ]
})
export class SettingsModalModule {}
