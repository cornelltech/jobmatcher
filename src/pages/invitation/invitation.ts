import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Invitation } from '../../models/invitation';
import { InvitationsProvider } from '../../providers/invitations/invitations';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the InvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'invitation-page',
  segment: 'invitation/:code',
})
@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  form:FormGroup;
  invitation$: Observable<Invitation>;
  userType$: Observable<'recruiter' | 'student'>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private invitation: InvitationsProvider,
    private auth: AuthProvider,
    private fb: FormBuilder) {
      this.createForm();
  }

  ionViewDidLoad() {
    this.resolveNavParams();

    this.userType$ = this.invitation$
      .map((payload) => payload.permissionScope);

    this.invitation$
      .filter((payload) => payload != null)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        this.form.patchValue({name:payload.name});
        this.form.patchValue({email:payload.target});
      });
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  resolveNavParams():void {
    const params = this.navParams.data;
    const code:string = params.code;
    
    this.invitation$ = this.invitation.lookup$(code);
  }

  createForm():void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    this.userType$
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((userType) => {
        this.auth
          .register$(
            formModel.email,
            formModel.password,
            formModel.name,
            userType
          )
          .takeUntil(this.ngUnsubscribe)
          .subscribe(() => {
            console.log('hi nex')
            this.navCtrl.setRoot('tabs-page');
          });
      });
  }

  goToLoginPage() {
    this.navCtrl.setRoot('login-page');
  }

}
