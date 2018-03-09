import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Student } from '../../models/user';
import { Requirement } from '../../models/requirement';
import { Permission } from '../../models/permission';

import { CompaniesProvider } from '../../providers/companies/companies';
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
  interestedStudents$:Observable<Student[]>;

  isOwner$:Observable<boolean>;
  isStudent$:Observable<boolean>;
  isFavoritedJob$:Observable<boolean>;

  favoritesIcon:string = "star-outline";

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private jobsProvider: JobsProvider,
    private companiesProvider: CompaniesProvider,
    private usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad JobDetailPage');
    //console.log('data id', this.navParams.data.id);

    this.job$ = this.jobsProvider
      .fetchJob$(this.navParams.data.id);

    this.company$ = this.job$
      .switchMap((payload) => this.companiesProvider.fetchCompany$(payload.company));

    this.isFavoritedJob$ = this.usersProvider.isFavoritedJob$(this.navParams.data.id);

    this.requirement$ = this.job$
      .map((payload) => payload.requirements);

    this.requirementItems$ = this.requirement$
      .filter((payload) => payload && payload !== undefined)
      .map((payload) => Object.keys(payload)
        .filter((key) => (key !== 'id'))
        .map((key) => ({key:key, value:payload[key]}))
      );

    this.interestedStudents$ = this.usersProvider
      .fetchInterestedStudents$(this.navParams.data.id);

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
        payload.permissions.userType === 'administrator' || // admins own everything
        payload.company.id === payload.permissions.affiliation)

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

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToStudent(evt:any, student:Student):void {
    //console.log('clicked it')
    //console.log(evt)
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
    console.log('hi hello what up')
    this.job$
      .take(1)
      .mergeMap((job) => this.usersProvider.isFavoritedJob$(job.id).take(1),
        (job, isFave:boolean) => ({job, isFave})
      )
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload => {
        if(payload.isFave) {
          //console.log("unfavoriting job", payload.job.id);
          this.usersProvider.unfavoriteJob(payload.job.id);
          this.jobsProvider.removeUserFromInterestedStudentsList(payload.job.id);
        } else {
          // console.log("favoriting job", payload.job.id);
          this.usersProvider.favoriteJob(payload.job.id);
          this.jobsProvider.addCurrentUserToInterestedStudentsList(payload.job.id);
        }
      }));
  }

  removeStudentFromJob(student:Student) {
    this.usersProvider.unfavoriteJob(this.navParams.data.id, student.uid);
    this.jobsProvider.removeUserFromInterestedStudentsList(this.navParams.data.id, student.uid)
    this.jobsProvider.addToBlacklist(this.navParams.data.id, student.uid);
  }

  reorderStudents(indexes) {
    this.usersProvider.fetchInterestedStudentUids$(this.navParams.data.id)
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((students) => {
        // get student being moved
        const student = students[indexes.from];

        // split around the insertion index
        let left = [];
        let right =[];
        // remove the thing we are moving
        if(indexes.from > indexes.to){
          left = students.slice(0,indexes.to);
          right = students.slice(indexes.to);
          right = right.filter((obj)=>obj!==student);
        }else{
          left = students.slice(0,indexes.to+1);
          right = students.slice(indexes.to+1);
          left = left.filter((obj)=>obj!==student);
        }

        // [left] + obj + [right]
        const reordered = [...left, student, ...right];

        // update database
        const itemRef = this.db.list(`jobs/${this.navParams.data.id}/students`);

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

  get requirementsSectionArrow():string {
    return this.isRequirementsSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }
  get peopleSectionArrow():string {
    return this.isPeopleSectionCollapsed ?
      'arrow-back' : 'arrow-down';
  }

}
