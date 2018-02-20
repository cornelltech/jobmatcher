import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TabsPage } from '../tabs/tabs';
import { CompaniesProvider } from '../../providers/companies/companies';
import { UsersProvider } from '../../providers/users/users';
import { AuthProvider } from '../../providers/auth/auth';

import { Company } from '../../models/company'


/**
 * Generated class for the CompanySelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'company-select-page',
  segment: 'affiliation',
})
@Component({
  selector: 'page-company-select',
  templateUrl: 'company-select.html',
})
export class CompanySelectPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  q:string;
  form:FormGroup;
  companies$:Observable<Company[]>;

  constructor(
    private location: Location,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private usersProvider:UsersProvider,
    private auth: AuthProvider,
    private companiesProvider:CompaniesProvider,
    private fb: FormBuilder) {
      this.createForm();
  }

  ionViewDidLoad() {
    this.companies$ = this.companiesProvider.fetchCompanies$();
  }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onInput(evt:any){ }

  createForm():void {
    this.form = this.fb.group({
        name: new FormControl('', [Validators.required]),
    });
  }

  lookupAndAffiliateCompany(name:string):void {
    this.companiesProvider.lookupCompany$(name)
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        this.usersProvider.affiliate(payload.id);
        this.goToApp();
      });
  }

  affiliateCompany(obj:Company):void {
    this.usersProvider.affiliate(obj.id);
    this.goToApp();
  }

  goToApp():void {
    const uid:string = this.auth.afAuth.auth.currentUser.uid;
    this.usersProvider.lookup$(uid)
    .take(1)
    .subscribe((payload) => {
      this.location.go('app');
      this.navCtrl.setRoot(TabsPage, {
        me: payload
      });
    });
    
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    this.companiesProvider.create(
      formModel.name,
    );
    this.createForm();
    this.lookupAndAffiliateCompany(formModel.name);
  }

}
