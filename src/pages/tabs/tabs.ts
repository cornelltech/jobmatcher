import 'rxjs/add/operator/filter';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CompanyDetailPage } from '../company-detail/company-detail';
import { CompanyListPage } from '../company-list/company-list';
import { JobListingPage } from '../job-listing/job-listing';
import { StudentDetailPage } from '../student-detail/student-detail';
import { StudentListPage } from '../student-list/student-list';

import { User } from '../../models/user';
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
    params?:any;
  }[];
  x = CompanyListPage;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
    this.userProvider
      .fetchMe$()
      .take(1)
      .subscribe((payload)=>{
        this.setupTabs(payload);
      });
  }

  ionViewDidLoad() { }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setupTabs(user:User){
    const permissions:Permission = user ? user.permission : null;
    if(permissions.userType === 'administrator') {
      this.tabs = [
        {
          title: 'Listings',
          icon: 'list',
          view: JobListingPage
        },
        {
          title: 'Students',
          icon: 'document',
          view: StudentListPage
        },
        {
          title: 'Companies',
          icon: 'briefcase',
          view: CompanyListPage
        }
      ];

    }else if(permissions.userType === 'recruiter') {
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
          view: CompanyDetailPage,
          params: {id: 1}
        }
      ];

    }else{
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
          view: StudentDetailPage,
          params: {id: user.id}
        }
      ];
    }
  }
}
