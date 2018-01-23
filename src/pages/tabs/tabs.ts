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

  tabs:{
    title:string;
    icon:string;
    view:any;
  }[];

  permission$:Observable<Permission>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
    this.permission$ = this.userProvider.fetchMyPermissions$();

    this.permission$.subscribe((payload) => {

      if(payload.userType === 'administrator') {

        this.tabs = [
          {
            title: 'Listings',
            icon: 'list',
            view: JobListingPage
          },
          {
            title: 'Students',
            icon: 'document',
            view: JobListingPage
          },
          {
            title: 'Companies',
            icon: 'briefcase',
            view: StudentDetailPage
          }
        ];

      } else if(payload.userType === 'recruiter') {

        this.tabs = [
          {
            title: 'Listings',
            icon: 'list',
            view: JobListingPage
          },
          {
            title: 'Add Listing',
            icon: 'add',
            view: CompanyDetailPage
          },
          {
            title: 'Profile',
            icon: 'briefcase',
            view: CompanyDetailPage
          }
        ];

      } else {
        // student

        this.tabs = [
          {
            title: 'Listings',
            icon: 'list',
            view: JobListingPage
          },
          {
            title: 'Favorites',
            icon: 'star',
            view: JobListingPage
          },
          {
            title: 'Profile',
            icon: 'document',
            view: StudentDetailPage
          }
        ];

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
