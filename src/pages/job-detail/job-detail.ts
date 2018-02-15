import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Student } from '../../models/user';
import { Requirement } from '../../models/requirement';
import { Permission } from '../../models/permission';

import { JobsProvider } from '../../providers/jobs/jobs';
import { UsersProvider } from '../../providers/users/users';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Generated class for the JobDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'job-detail-page',
  segment: 'job-details/:id',
  defaultHistory: ['job-listing-page']
})
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  isRequirementsSectionCollapsed:boolean = false;
  isPeopleSectionCollapsed:boolean = false;

  job$:Observable<Job>;
  company$:Observable<Company>;
  requirement$:Observable<Requirement>;
  requirementItems$:Observable<{key:string, value:any}[]>;
  students:Observable<Student[]>;

  isOwner$:Observable<boolean>;
  isStudent$:Observable<boolean>;
  isFavoritedJob$:Observable<boolean>;

  favoritesIcon:string = "star-outline";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private jobsProvider: JobsProvider,
    private usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailPage');
    console.log('data id', this.navParams.data.id);

    this.job$ = this.jobsProvider
      .fetchJob$(this.navParams.data.id);

    this.company$ = this.job$
      .map((payload) => payload.company);


    this.isFavoritedJob$ = this.usersProvider.isFavoritedJob$(this.navParams.data.id);

    this.requirement$ = this.job$
      .map((payload) => payload.requirements);

    this.requirementItems$ = this.requirement$
      .filter((payload) => payload && payload !== undefined)
      .map((payload) => Object.keys(payload)
        .filter((key) => (key !== 'id'))
        .map((key) => ({key:key, value:payload[key]}))
      );

    this.isStudent$ = this.usersProvider
      .fetchMyPermissions$()
      .map((payload) => payload.userType == "student");

    this.isOwner$ = Observable
      .combineLatest(
        this.company$,
        this.usersProvider.fetchMyPermissions$(),
          (company:Company, permissions:Permission) =>
            ({company, permissions})
      )
      .map((payload) =>
        payload.company.id === payload.permissions.affiliation.id)

    this.job$
      .switchMap((payload) =>
        this.usersProvider
          .isFavoritedJob$(payload.id))
          .map((payload) => payload ? "star" : "star-outline")
          .takeUntil(this.ngUnsubscribe)
          .subscribe((payload) => {
            this.favoritesIcon = payload
          });
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToStudent(evt:any, student:Student):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('student-detail-page', { id: student.uid })
  }

  goToCompany(evt:any):void {
    this.company$
      .map((payload:Company) => payload.id)
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload:string) =>
        this.navCtrl.push('company-detail-page', {id: payload})
      )
  }


  toggleRequirementsCollapse():void {
    this.isRequirementsSectionCollapsed = !this.isRequirementsSectionCollapsed;
  }
  togglePeopleCollapse():void {
    this.isPeopleSectionCollapsed = !this.isPeopleSectionCollapsed;
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

  addFavorite() {
    this.job$
      .take(1)
      .mergeMap((job) => this.usersProvider.isFavoritedJob$(job.id).take(1),
        (job, isFave:boolean) => ({job, isFave})
      )
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload => {
        if(payload.isFave) {
          console.log("unfavoriting job", payload.job.id);
          this.usersProvider.unfavoriteJob(payload.job.id);
        } else {
          console.log("favoriting job", payload.job.id);
          this.usersProvider.favoriteJob(payload.job.id);
        }
      }));
  }

  get requirementsSectionArrow():string {
    return this.isRequirementsSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }
  get peopleSectionArrow():string {
    return this.isPeopleSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }

}
