import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
  form:FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb:FormBuilder,
    public modalCtrl: ModalController,
    private usersProvider:UsersProvider,
    private jobsProvider:JobsProvider) {
      this.createForm();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddListingPage');
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

  // Form Controls
  createForm():void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]]
    })
  }

  onFormSubmit():void {
    // TODO: this is broken (the form) + also none of your users have companies rn
    //console.log('hello!!!');
    this.usersProvider.fetchMyPermissions$().subscribe((permissions) => {
      //console.log('WHATS UP');
      // const jobData = {companyId: permissions.affiliation.id, formValue: this.form.value};
      //console.log('form=', this.form.value);
      const job:Job = Object.assign({}, this.form.value, {
        company: permissions.affiliation
      });
      this.jobsProvider.createJobListing(job);
      this.form.reset();
    })
  }

}
