import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CompaniesProvider } from '../../providers/companies/companies';

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
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
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

  onInput(evt:any){
    console.log(this.q)
  }

  createForm():void {
    this.form = this.fb.group({
        name: new FormControl('', [Validators.required]),
    })
  }

  onFormSubmit():void {
    const formModel = this.form.value;
    console.log(formModel)
    this.companiesProvider.create(
      formModel.name,
    );
    this.createForm();
  }

}
