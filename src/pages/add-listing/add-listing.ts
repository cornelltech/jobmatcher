import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Toast } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Job } from '../../models/job';


import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { JobsProvider } from '../../providers/jobs/jobs';
import { UsersProvider } from '../../providers/users/users';
/**
 * Generated class for the AddListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'add-listing-page',
  segment: 'add-listing',
})

@Component({
  selector: 'page-add-listing',
  templateUrl: 'add-listing.html',
})
export class AddListingPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  form:FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb:FormBuilder,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private usersProvider:UsersProvider,
    private jobsProvider:JobsProvider) {
      this.createForm();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddListingPage');
  }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

  // Form Controls
  createForm():void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      status: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      visa: ['', [Validators.required]]
    })
  }

  onFormSubmit():void {
    this.usersProvider
      .fetchMyPermissions$()
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((permissions) => {
        const job:Job = Object.assign({}, this.form.value, {
          company: permissions.affiliation
        });
        this.jobsProvider.createJobListing(job);
        this.form.reset();

        this.toastCtrl
          .create({
              message: `Listing Succesfully Added!`,
              duration: 3000,
              position: 'bottom'
          })
          .present();
    });
  }

}
