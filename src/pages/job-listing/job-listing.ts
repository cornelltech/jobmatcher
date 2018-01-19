import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Observable } from 'rxjs/Observable';

import { Job } from '../../models/job';

/**
 * Generated class for the JobListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'job-listing-page',
  segment: 'jobs',
})
@Component({
  selector: 'page-job-listing',
  templateUrl: 'job-listing.html',
})
export class JobListingPage {
  jobs$: Observable<Job[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private jobsProvider: JobsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobListingPage');
    this.jobs$ = this.jobsProvider.fetchJobs$();
  }

  goToDetail(evt:any):void {
    console.log('clicked job detail')
    console.log(evt)
    this.navCtrl.push('job-detail-page', { id: 24 })
  }

  goToCompany(evt:any):void {
    console.log('clicked company')
    console.log(evt)
    this.navCtrl.push('company-detail-page')
  }

}
