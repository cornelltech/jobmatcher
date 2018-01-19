import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JobDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'job-detail-page',
  segment: 'job-details/:id',
})
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailPage');
  }

  goToStudent(evt:any):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('student-detail-page')
  }

  goToCompany(evt:any):void {
    console.log('clicked it')
    console.log(evt)
    this.navCtrl.push('company-detail-page')
  }

}
