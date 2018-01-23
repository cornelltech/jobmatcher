import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { JobListingPage } from '../job-listing/job-listing';
import { StudentDetailPage } from '../student-detail/student-detail';
import { CompanyDetailPage } from '../company-detail/company-detail';

import { Permission } from '../../models/permission';


import { UsersProvider } from '../../providers/users/users';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 @IonicPage({
   name: 'tabs-page',
   segment: 'app',
 })
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any;
  tab2:any;
  tab3:any;
  permission$:Observable<Permission>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
    this.permission$ = this.userProvider.fetchMyPermissions$();

    this.permission$.subscribe((payload) => {

      if(payload.userType === 'administrator') {

        this.tab1 = JobListingPage;
        this.tab2 = StudentDetailPage;
        this.tab3 = StudentDetailPage;

      } else if(payload.userType === 'recruiter') {

        this.tab1 = JobListingPage;
        this.tab2 = CompanyDetailPage;
        this.tab3 = CompanyDetailPage;

      } else {
        // student
        this.tab1 = JobListingPage;
        this.tab2 = StudentDetailPage;
        this.tab3 = StudentDetailPage;

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
