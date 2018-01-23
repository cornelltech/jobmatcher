import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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

}
