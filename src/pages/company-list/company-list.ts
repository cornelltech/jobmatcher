import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CreateStudentModal } from '../create-student-modal/create-student-modal';
import { CompaniesProvider } from '../../providers/companies/companies';

import { Company } from '../../models/company'

/**
 * Generated class for the CompanyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'company-list-page',
  segment: 'companies'
})
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {
  companies$:Observable<Company[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private companiesProvider:CompaniesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyListPage');
    this.companies$ = this.companiesProvider.fetchCompanies$();
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(evt:any, company:Company):void {
    console.log('clicked company detail')
    console.log(evt)
    this.navCtrl.push('company-detail-page', { id: company.id })
  }

  openModal():void {
    const modal = this.modalCtrl.create(CreateStudentModal, {target: 'company'});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

}
