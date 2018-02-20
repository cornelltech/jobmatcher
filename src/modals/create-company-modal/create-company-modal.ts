import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

/**
 * Generated class for the CreateStudentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'create-company-modal',
  templateUrl: 'create-company-modal.html',
})
export class CreateCompanyModal {
  form:FormGroup;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public companiesProvider: CompaniesProvider,
    private fb: FormBuilder) {
      this.createForm();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateUserModal');
  }

  closeModal():void {
    this.viewCtrl.dismiss({});
  }

  // Form Controls
  createForm():void {
    this.form = this.fb.group({
        name: new FormControl('', [Validators.required]),
    })
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    formModel.list.map((obj) => {
      this.companiesProvider.create(
        obj.name,
      );
    });
    this.createForm();
    this.presentToast();

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Created Successfully',
      duration: 5000
    });
    toast.present();
  }

}
