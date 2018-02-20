import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import 'rxjs/add/operator/mergeMap';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AngularFireDatabase } from 'angularfire2/database';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { JobsProvider } from '../../providers/jobs/jobs';
import { UsersProvider } from '../../providers/users/users';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { User } from '../../models/user';

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

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public navParams: NavParams, public modalCtrl: ModalController,
    private jobsProvider: JobsProvider, private usersProvider: UsersProvider) {
      //console.log('faves?', this.navParams.data.faves)
      this.faves = this.navParams.data.faves;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad JobListingPage');
    if(this.faves) {
      //console.log('call fave page');
      this.jobs$ = this.jobsProvider.fetchMyFavoriteJobs$();
      // this.jobs$.subscribe(() => {});
    } else {
      //console.log('not fave page');
      this.jobs$ = this.jobsProvider.fetchJobs$();
    }
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(evt:any, job:Job):void {
    //console.log('clicked job detail')
    //console.log(evt)
    this.navCtrl.push('job-detail-page', { id: job.id })
  }

  goToCompany(evt:any, company:Company):void {
    //console.log('clicked company')
    //console.log(evt)
    evt.stopPropagation();
    this.navCtrl.push('company-detail-page', { id: company.id })
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

  reorderJobs(indexes) {
    //console.log(indexes);
    this.usersProvider.fetchMyFavoriteJobs$()
      .take(1)
      .mergeMap((jobs) => this.usersProvider.fetchMe$().take(1),
        (jobs:string[], user:User) => ({jobs, user})
      )
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        // reorder list from reorder event
        let job = payload.jobs[indexes.from];
        payload.jobs.splice(indexes.from, 1);
        payload.jobs.splice(indexes.to, 0, job);

        // update database
        let userKey = payload.user.id;
        const itemRef = this.db.list(`users/${userKey}/jobs`);
        itemRef.remove();
        payload.jobs.forEach((job) => itemRef.push(job));
      });
  }

}
