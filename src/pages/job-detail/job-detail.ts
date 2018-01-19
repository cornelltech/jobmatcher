import 'rxjs/add/operator/filter';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Job } from '../../models/job';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the JobDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'job-detail-page',
  segment: 'job-details/:id',
})
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {
  job$:Observable<Job>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private jobsProvider: JobsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailPage');

    this.job$ = this.jobsProvider.fetchJob$(this.navParams.data.id);
  }

  goToStudent(evt:any):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('student-detail-page')
  }

  goToCompany(evt:any):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('company-detail-page')
  }

}
