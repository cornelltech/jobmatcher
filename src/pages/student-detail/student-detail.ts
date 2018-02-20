import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';

import { SettingsModal } from '../../modals/settings-modal/settings-modal';

import { Student, User } from '../../models/user';
import { UsersProvider } from '../../providers/users/users';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the StudentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'student-detail-page',
  segment: 'student-detail/:id',
})
@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html',
})
export class StudentDetailPage {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  student$:Observable<Student>;
  isOwner$:Observable<boolean>;
  isEditing:boolean;
  form:FormGroup;

  PROGRAMS = [
    'CS', 'CM', 'HT', 'LLM', 'MBA', 'ORIE', 'ECE', 'DESIGN'
  ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private usersProvider: UsersProvider,
    private fb: FormBuilder) {
  }

  ionViewDidLoad() {
     ('ionViewDidLoad StudentDetailPage');

    this.student$ = this.usersProvider
      .fetchStudent$(this.navParams.data.id);

    this.student$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        this.createForm(payload);
      });

    this.isOwner$ = Observable
      .combineLatest(
        this.student$,
        this.usersProvider.fetchMe$(),
          (currentPageStudent:Student, me:User) =>
            ({currentPageStudent, me})
      )
      .filter((payload) => payload.me && payload.me !== undefined)
      .map((payload) =>
        payload.me.permission.userType == 'student' && payload.currentPageStudent.uid === payload.me.uid)

  }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  createForm(obj:Student):void {
    this.form = this.fb.group({
        name: new FormControl(obj?obj.name:'', [Validators.required]),
        email: new FormControl(obj?obj.email:'', []),
        description: new FormControl(obj?obj.description:'', []),
        year: new FormControl(obj?obj.year:'', []),
        program: new FormControl(obj?obj.program:'', []),
        resumeLink: new FormControl(obj?obj.resumeLink:'', []),
    });
  }

  onFormSubmit():void {
    this.student$
      .take(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((payload) => {
        const formModel = this.form.value;
        this.usersProvider.update(payload.id, formModel);
        this.form.reset();
        this.isEditing = false;
      });
  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

}
