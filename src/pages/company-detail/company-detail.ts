import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Company } from '../../models/company';
import { Permission } from '../../models/permission';

import { CompaniesProvider } from '../../providers/companies/companies';
import { UsersProvider } from '../../providers/users/users';


/**
 * Generated class for the CompanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'company-detail-page',
  segment: 'company-details/:id',
})
@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  company$:Observable<Company>;
  isOwner$:Observable<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
             private usersProvider: UsersProvider, private companiesProvider: CompaniesProvider) {
  }

  ionViewDidLoad() {
    this.company$ = this.companiesProvider
      .fetchCompany$(this.navParams.data.id);

    this.isOwner$ = Observable
      .combineLatest(
        this.company$,
        this.usersProvider.fetchMyPermissions$(),
          (company:Company, permissions:Permission) =>
            ({company, permissions})
      )
      .map((payload) =>
        payload.company.id === payload.permissions.affiliation)
  }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

}
