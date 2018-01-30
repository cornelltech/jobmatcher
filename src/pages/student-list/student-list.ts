import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CreateUserModal } from '../create-user-modal/create-user-modal';
import { UsersProvider } from '../../providers/users/users';

import { Student } from '../../models/user'

/**
 * Generated class for the StudentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'student-list-page',
  segment: 'students'
})
@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
  students$:Observable<Student[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private usersProvider:UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentListPage');
    this.students$ = this.usersProvider.fetchStudents$();
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(evt:any, student:Student):void {
    console.log('clicked student detail')
    console.log(evt)
    this.navCtrl.push('student-detail-page', { id: student.id })
  }

  openModal():void {
    const modal = this.modalCtrl.create(CreateUserModal, {target: 'student'});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

}