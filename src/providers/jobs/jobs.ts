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
      description: `
      RegExr v3 was created by gskinner.com, and is proudly hosted by Media Temple.

      Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & Javascript flavors of RegEx are supported.

      The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community, and view patterns you create or favorite in My Patterns.

      Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.

      `,
      location: 'nevada',
      company: {
        id: 'ct2',
        name: 'cornell tech2',
        description: 'yolo',
        link: null,
        logo: null
      },
      requirements: {
        id: 'sesodnsdsdsd',
        visa: 'visa1',
        balla: true
      },
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
      requirements: {
        id: 'sesodnsdsdsdsassasaa',
        visa: 'visa3'
      },
      session: null
    }
  ]
  faveJobs:Job[] = [
    {
      id: 'stusfdffsd',
      title: 'something',
      description: `
      RegExr v3 was created by gskinner.com, and is proudly hosted by Media Temple.

      Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & Javascript flavors of RegEx are supported.

      The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community, and view patterns you create or favorite in My Patterns.

      Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.

      `,
      location: 'nevada',
      company: {
        id: 'ct2',
        name: 'cornell tech2',
        description: 'yolo',
        link: null,
        logo: null
      },
      requirements: {
        id: 'sesodnsdsdsd',
        visa: 'visa1',
        balla: true
      },
      session: null
    },
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

  fetchMyFavoriteJobs$():Observable<Job[]> {
    return of(this.faveJobs);
  }

}
