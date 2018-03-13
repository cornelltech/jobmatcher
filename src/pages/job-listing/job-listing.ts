import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import 'rxjs/add/operator/mergeMap';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/Observable/of';

import { AngularFireDatabase } from 'angularfire2/database';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { CompaniesProvider } from '../../providers/companies/companies';
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
  companies$: Observable<Company[]>;
  faves:boolean;

  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private companiesProvider: CompaniesProvider,
    private jobsProvider: JobsProvider,
    private usersProvider: UsersProvider) {
      this.faves = this.navParams.data.faves;

  }

  ionViewDidLoad() {
    this.companies$ = this.companiesProvider.fetchCompanies$();

    this.usersProvider
      .fetchMyPermissions$()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        if(this.faves) {
          this.jobs$ = this.jobsProvider.fetchMyFavoriteJobs$();
        }
        else if(payload.userType === 'recruiter'){
          this.jobs$ = this.jobsProvider.fetchJobsForCompany$(payload.affiliation)
        }else{
          this.jobs$ = this.jobsProvider.fetchJobs$()
        }
      });
  }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(evt:any, job:Job):void {
    this.navCtrl.push('job-detail-page', { id: job.id })
  }

  goToCompany(evt:any, company:string):void {
    evt.stopPropagation();
    this.navCtrl.push('company-detail-page', { id: company })
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

  reorderJobs(indexes) {
    this.usersProvider.fetchMyFavoriteJobs$()
      .take(1)
      .mergeMap((jobs) => this.usersProvider.fetchMe$().take(1),
        (jobs:string[], user:User) => ({jobs, user})
      )
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        // get job being moved
        const job = payload.jobs[indexes.from];
        
        // split around the insertion index
        let left = [];
        let right =[];
        // remove the thing we are moving
        if(indexes.from > indexes.to){
          left = payload.jobs.slice(0,indexes.to);
          right = payload.jobs.slice(indexes.to);
          right = right.filter((obj)=>obj!==job);
        }else{
          left = payload.jobs.slice(0,indexes.to+1);
          right = payload.jobs.slice(indexes.to+1);
          left = left.filter((obj)=>obj!==job);
        }

        // [left] + obj + [right]
        const reordered = [...left, job, ...right];

        // update database
        let userKey = payload.user.id;

        const itemRef = this.db.list(`users/${userKey}/jobs`);
        
        itemRef.snapshotChanges()
          .map((changes) => changes.map((obj) => obj.key))
          .take(1)
          .takeUntil(this.ngUnsubscribe)
          .subscribe((keys) => {
            keys.forEach((key, i) => {
              itemRef.set(key, reordered[i])
            });
          });

      });
  }


  getCompanyNameFromJob$(job:Job):Observable<string> {
    return this.companiesProvider
      .fetchCompany$(job.company)
      .map((payload) => payload.name);
  }

  getCompanyAvatarFromJob$(job:Job):Observable<string> {
    return this.companiesProvider
      .fetchCompany$(job.company)
      .map((payload) => payload.logo);
  }
}
