import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Job } from '../../models/job';

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
    private usersProvider:UsersProvider,
    private jobsProvider:JobsProvider) {
      this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListingPage');
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
    this.usersProvider.fetchMyPermissions$().subscribe((payload) => {
      const jobData = {companyId: payload.affiliation.id, formValue: this.form.value};

      const job:Job = Object.assign({}, this.form.value, {
        company: payload.affiliation
      });
      console.log(job);
      this.jobsProvider.createJobListing(job);
    })
    this.form.reset();
  }

}
