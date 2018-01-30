import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { InvitationsProvider } from '../../providers/invitations/invitations';

/**
 * Generated class for the CreateStudentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'create-user-modal',
  templateUrl: 'create-user-modal.html',
})
export class CreateUserModal {
  form:FormGroup;
  target:'recruiter' | 'student';

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public inviationsProvider: InvitationsProvider,
    private fb: FormBuilder) {
      this.createForm();
      this.target = navParams.get('target');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserModal');
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
    formModel.list.map((obj) => {
      this.inviationsProvider.create(
        obj.email,
        obj.name,
        this.target,
      );
      this.form.reset();
    });

  }

}
