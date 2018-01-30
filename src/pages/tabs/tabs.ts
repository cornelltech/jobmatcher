import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AddListingPage } from '../add-listing/add-listing';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { CompanyListPage } from '../company-list/company-list';
import { JobListingPage } from '../job-listing/job-listing';
import { StudentDetailPage } from '../student-detail/student-detail';
import { StudentListPage } from '../student-list/student-list';

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

  permission$:Observable<Permission>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
    this.permission$ = this.userProvider.fetchMyPermissions$();
    this.permission$.takeUntil(this.ngUnsubscribe)
    .subscribe((payload) => {

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
            view: StudentListPage
          },
          {
            title: 'Companies',
            icon: 'briefcase',
            view: CompanyListPage
          }
        ];

      } else if(payload.userType === 'recruiter') {
        this.userProvider.fetchMyPermissions$().takeUntil(this.ngUnsubscribe)
        .subscribe((payload) => {
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
              params: {id: payload.affiliation.id}
            }
          ];
        })

      } else {
        // student

        this.userProvider.fetchMe$().takeUntil(this.ngUnsubscribe)
          .subscribe((payload) => {
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
                params: {id: payload.id}
              }
            ];
          });

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  ionViewDidLeave():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
