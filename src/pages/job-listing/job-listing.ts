import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { Job } from '../../models/job';
import { Company } from '../../models/company';

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
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  jobs$: Observable<Job[]>;
  faves:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private jobsProvider: JobsProvider) {
      console.log('faves?', this.navParams.data.faves)
      this.faves = this.navParams.data.faves;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobListingPage');
    if(this.faves) {
      console.log('call fave page');
      this.jobs$ = this.jobsProvider.fetchMyFavoriteJobs$();
      // this.jobs$.subscribe(() => {});
    } else {
      console.log('not fave page');
      this.jobs$ = this.jobsProvider.fetchJobs$();
    }
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(evt:any, job:Job):void {
    console.log('clicked job detail')
    console.log(evt)
    this.navCtrl.push('job-detail-page', { id: job.id })
  }

  goToCompany(evt:any, company:Company):void {
    console.log('clicked company')
    console.log(evt)
    evt.stopPropagation();
    this.navCtrl.push('company-detail-page', { id: company.id })
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

}
