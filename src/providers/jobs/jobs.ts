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
      id: 'stusfdffsd',
      title: 'something',
      description: 'here is a thing to do',
      location: 'nevada',
      company: {
        id: 'ct',
        name: 'cornell tech',
        description: 'yolo',
        link: null,
        logo: null
      },
      requirements: null,
      session: null
    },
    {
      id: 'stusfdffsdssd',
      title: 'something else',
      description: 'here is a thing to do',
      location: 'nevada',
      company: {
        id: 'ct',
        name: 'cornell tech',
        description: 'yolo',
        link: null,
        logo: null
      },
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

  fetchJob$(key:string):Observable<Job> {
    const item:Job = this.jobs
      .find((obj) => obj.id === key);
    return of(item);
  }

}
