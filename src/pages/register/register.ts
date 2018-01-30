import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'register-page',
  segment: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AuthProvider,
    private fb: FormBuilder) {
      this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createForm():void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    this.auth.register(formModel.email, formModel.password);
  }

  goToLoginPage() {
    this.navCtrl.setRoot('login-page');
  }

}
