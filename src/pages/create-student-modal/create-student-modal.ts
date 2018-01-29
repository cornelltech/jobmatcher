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
  selector: 'page-create-student-modal',
  templateUrl: 'create-student-modal.html',
})
export class CreateStudentModal {
  form:FormGroup;
  target:string;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder) {
      this.createForm();
      this.target = navParams.get('target');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateStudentModal');
  }

  closeModal():void {
    this.viewCtrl.dismiss({});
  }

  // Form Controls
  createForm():void {
    this.form = this.fb.group({
      list: this.fb.array([ this.createItem() ])
    })
  }

  addItem():void {
    const list = this.form.get('list') as FormArray;
    list.push(this.createItem());
  }

  removeItem(index:number):void {
    const list = this.form.get('list') as FormArray;
    list.removeAt(index);
  }

  createItem():FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email])
    });
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    console.log(formModel);
    this.form.reset();
  }

}
