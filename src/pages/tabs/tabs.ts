import 'rxjs/add/operator/filter';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AddListingPage } from '../add-listing/add-listing';
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

  color:string;

  permission$:Observable<Permission>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
    const me:User = this.navParams.get('me');
    if(me){
      this.setupTabs(me);
    }else{
      // TODO: Figure out a more graceful fallback
    }


  }

  ionViewDidLoad() { }

  ionViewWillUnload():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setupTabs(user:User){
    const permissions:Permission = user ? user.permission : null;
    if(permissions.userType === 'administrator') {
      this.color = "danger";
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
      this.color = "secondary";
      this.tabs = [
        {
          title: 'Listings',
          icon: 'list',
          view: JobListingPage
        },
        {
          title: 'Add Listing',
          icon: 'add',
          view: AddListingPage
        },
        {
          title: 'Profile',
          icon: 'briefcase',
          view: CompanyDetailPage,
          params: {id: 'ct'}
        }
      ];

    }else{
      // student
      this.color = "primary";
      this.tabs = [
        {
          title: 'Listings',
          icon: 'list',
          view: JobListingPage
        },
        {
          title: 'Favorites',
          icon: 'star',
          view: JobListingPage,
          params: {faves: true}
        },
        {
          title: 'Profile',
          icon: 'document',
          view: StudentDetailPage,
          params: {id: user.uid}
        }
      ];
    }
  }
}
