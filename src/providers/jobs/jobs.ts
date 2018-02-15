import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';

import { Job } from '../../models/job';
import { UsersProvider } from '../../providers/users/users';

/*
  Generated class for the JobsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobsProvider {
  jobs$:Observable<Job[]>;

  constructor(private db: AngularFireDatabase, private usersProvider: UsersProvider) {
    console.log('Hello JobsProvider Provider');
    // TODO: actually do this lol
    this.jobs$ = db.list('jobs').snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.val() as Job;
          data.id = a.payload.key;
          return data;
        })
      });
  }

  fetchJobs$():Observable<Job[]> {
    return this.jobs$;
  }

  fetchJob$(key:string):Observable<Job> {
    return this.jobs$.map((jobs) =>
      jobs.find((job) => job.id === key));
  }

  fetchMyFavoriteJobs$():Observable<Job[]> {
    return Observable.combineLatest(
      this.jobs$,
      this.usersProvider.fetchMyFavoriteJobs$(),
        (jobs:Job[], ids:string[]) =>
          ({jobs, ids})
        )
        .map(payload =>
          {console.log('fave jobs', payload)
            return payload.jobs
            .filter((job) =>
              (payload.ids
                && payload.ids != undefined
                && payload.ids.indexOf(job.id) > -1))});
  }

  createJobListing(job:Job) {
    console.log('job=', job);
    const itemRef = this.db.list('jobs');
    itemRef.push(job);
  }

}
