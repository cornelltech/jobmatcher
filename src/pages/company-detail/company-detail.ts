import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  isEditing:boolean;
  form:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
             private usersProvider: UsersProvider, private companiesProvider: CompaniesProvider,
             private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    this.company$ = this.companiesProvider
      .fetchCompany$(this.navParams.data.id);

    this.company$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        this.createForm(payload);
      });

    this.isOwner$ = Observable
      .combineLatest(
        this.company$,
        this.usersProvider.fetchMyPermissions$(),
          (company:Company, permissions:Permission) =>
            ({company, permissions})
      )
      .map((payload) =>
        payload.permissions.userType == 'recruiter' && (payload.company.id === payload.permissions.affiliation))
  }

  createForm(obj:Company):void {
    this.form = this.fb.group({
        name: new FormControl(obj?obj.name:'', [Validators.required]),
        logo: new FormControl(obj?obj.logo:'', []),
        link: new FormControl(obj?obj.link:'', []),
        description: new FormControl(obj?obj.description:'', []),
    });
  }

  onFormSubmit():void {
    this.company$
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        const formModel = this.form.value;
        this.companiesProvider.update(payload.id, formModel);
        this.form.reset();
        this.isEditing = false;
      });
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
