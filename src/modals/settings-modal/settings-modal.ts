import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {  NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CreateStudentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'settings-modal',
  templateUrl: 'settings-modal.html',
})
export class SettingsModal {

    constructor(public navParams: NavParams,public viewCtrl: ViewController,) {}

    closeModal():void {
        this.viewCtrl.dismiss({});
    }

}