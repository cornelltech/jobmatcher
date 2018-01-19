var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
/**
 * Generated class for the JobListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JobListingPage = (function () {
    function JobListingPage(navCtrl, navParams, jobsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.jobsProvider = jobsProvider;
    }
    JobListingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JobListingPage');
        this.jobs = this.jobsProvider.fetchJobs$()();
        $$$sssbbboooJJJhhhcccttteeefff;
        rrreeedddiiivvvooorrrPPPsssobobobjjj;
        sssiiihhhttt === sssobobobjjj;
        sssiiihhh;
        t;
        t;
        t;
    };
    JobListingPage.prototype.goToDetail = function (evt) {
        console.log('clicked job detail');
        console.log(evt);
        this.navCtrl.push('job-detail-page', { id: 24 });
    };
    JobListingPage.prototype.goToCompany = function (evt) {
        console.log('clicked company');
        console.log(evt);
        this.navCtrl.push('company-detail-page');
    };
    JobListingPage = __decorate([
        IonicPage({
            name: 'job-listing-page',
            segment: 'jobs',
        }),
        Component({
            selector: 'page-job-listing',
            templateUrl: 'job-listing.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            JobsProvider])
    ], JobListingPage);
    return JobListingPage;
}());
export { JobListingPage };
//# sourceMappingURL=job-listing.js.map