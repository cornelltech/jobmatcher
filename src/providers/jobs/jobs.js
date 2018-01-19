var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/observable/from';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
/*
  Generated class for the JobsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var JobsProvider = (function () {
    function JobsProvider(http) {
        this.http = http;
        this.jobs = [
            {
                title: 'something',
                description: 'here is a thing to do',
                location: 'nevada',
                company: null,
                requirements: null,
                session: null
            },
            {
                title: 'something else',
                description: 'here is a thing to do',
                location: 'nevada',
                company: null,
                requirements: null,
                session: null
            }
        ];
        console.log('Hello JobsProvider Provider');
    }
    JobsProvider.prototype.fetchJobs$ = function () {
        return of(this.jobs);
    };
    JobsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], JobsProvider);
    return JobsProvider;
}());
export { JobsProvider };
//# sourceMappingURL=jobs.js.map