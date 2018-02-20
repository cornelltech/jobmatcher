import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CreateCompanyModal } from '../../modals/create-company-modal/create-company-modal';
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
  companies$:Observable<Company[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private companiesProvider:CompaniesProvider) {
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

  openModal():void {
    const modal = this.modalCtrl.create(CreateCompanyModal, {target: 'recruiter'});
    modal.onDidDismiss(data => {
      //console.log(data);
    });
    modal.present();
  }

}
