import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'login-page',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthProvider,
    private fb: FormBuilder) {
      this.createForm();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  createForm():void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onFormSubmit():void {
    //console.log('login')
    const formModel = this.form.value;
    this.auth.login(formModel.email, formModel.password);
  }

  goToRegisterPage() {
    this.navCtrl.setRoot('register-page');
  }

}
