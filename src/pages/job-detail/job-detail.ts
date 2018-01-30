import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Student } from '../../models/user';
import { Requirement } from '../../models/requirement';
import { Permission } from '../../models/permission';

import { JobsProvider } from '../../providers/jobs/jobs';
import { UsersProvider } from '../../providers/users/users';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private jobsProvider: JobsProvider, private usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailPage');

    this.job$ = this.jobsProvider
      .fetchJob$(this.navParams.data.id);

    this.company$ = this.job$
      .map((payload) => payload.company);

    this.requirement$ = this.job$
      .map((payload) => payload.requirements);

    this.requirementItems$ = this.requirement$
      .filter((payload) => payload && payload !== undefined)
      .map((payload) => Object.keys(payload)
        .filter((key) => (key !== 'id'))
        .map((key) => ({key:key, value:payload[key]}))
      );


    this.isOwner$ = Observable
      .combineLatest(
        this.company$,
        this.usersProvider.fetchMyPermissions$(),
          (company:Company, permissions:Permission) =>
            ({company, permissions})
      )
      .map((payload) =>
        payload.company.id === payload.permissions.affiliation.id)

  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToStudent(evt:any, student:Student):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('student-detail-page', { id: student.id })
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


  get requirementsSectionArrow():string {
    return this.isRequirementsSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }
  get peopleSectionArrow():string {
    return this.isPeopleSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }

}
