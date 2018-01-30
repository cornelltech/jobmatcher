import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
  student$:Observable<Student>;
  isOwner$:Observable<boolean>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentDetailPage');

    this.student$ = this.usersProvider
      .fetchStudent$(this.navParams.data.id);

    this.isOwner$ = Observable
      .combineLatest(
        this.student$,
        this.usersProvider.fetchMe$(),
          (currentPageStudent:Student, me:User) =>
            ({currentPageStudent, me})
      )
    .map((payload) =>
      payload.currentPageStudent.id === payload.me.id)

  }

  openSettingsModal() {
    const modal = this.modalCtrl.create(SettingsModal);
    modal.present();
  }

}
