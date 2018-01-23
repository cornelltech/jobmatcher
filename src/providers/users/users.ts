import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Job } from '../../models/job';
import { Permission } from '../../models/permission';
import { User } from '../../models/user';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  me:User = {
    id: 'abcde',
    name: 'jon do',
    email: 'jon@example.com',
    permission: {
      id: 'fghijk',
      userType: 'student',
      affiliation: null
    },
    jobs: []
  }

  constructor() {
    console.log('Hello UsersProvider Provider');
  }

  fetchMe$():Observable<User> {
    return of(this.me);
  }

  fetchMyPermissions$():Observable<Permission> {
    return this.fetchMe$().map((payload) => payload.permission)
  }

  favoriteJob(job:Job):void {
    this.me.jobs = [job, ...this.me.jobs];
  }

  unfavoriteJob(job:Job):void {
    this.me.jobs = this.me.jobs.filter((payload) => payload.id !== job.id);
  }

}
