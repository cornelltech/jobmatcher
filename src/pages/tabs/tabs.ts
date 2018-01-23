import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobListingPage } from '../job-listing/job-listing';
import { StudentDetailPage } from '../student-detail/student-detail';
import { CompanyDetailPage } from '../company-detail/company-detail';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsComponent {
  tab1:any = JobListingPage;
  tab2:any = StudentDetailPage;
  tab3:any = CompanyDetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
