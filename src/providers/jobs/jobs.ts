import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Job } from '../../models/job';
/*
  Generated class for the JobsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobsProvider {
  jobs: Job[] = [
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
  ]

  constructor() {
    console.log('Hello JobsProvider Provider');
  }

  fetchJobs$():Observable<Job[]> {
    return of(this.jobs);
  }

}
