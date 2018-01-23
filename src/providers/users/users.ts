import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Permission } from '../../models/permission';
import { User, Student } from '../../models/user';

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
      userType: 'administrator',
      affiliation: null
    },
    jobs: []
  }

  recruiters:User[] = []

  students:Student[] = [
    {
      id: 'abcdefffffffff',
      name: 'jon do',
      email: 'jon@example.com',
      permission: {
        id: 'fghijk',
        userType: 'student',
        affiliation: null
      },
      jobs: [],
      year: 2018,
      program: 'CS',
      resumeLink: null
    },
    {
      id: 'abcadfdsdde',
      name: 'jane do',
      email: 'jane@example.com',
      permission: {
        id: 'fghiasssssjk',
        userType: 'student',
        affiliation: null
      },
      jobs: [],
      year: 2018,
      program: 'LLM',
      resumeLink: null
    },
    {
      id: 'adfdsdde',
      name: 'lo do',
      email: 'lo@example.com',
      permission: {
        id: 'fasssssjk',
        userType: 'student',
        affiliation: null
      },
      jobs: [],
      year: 2019,
      program: 'ORIE',
      resumeLink: null
    }
  ]

  constructor() {
    console.log('Hello UsersProvider Provider');
  }

  fetchStudents$():Observable<Student[]> {
    return of(this.students)
  }

  fetchRecruiters$(company:Company=null):Observable<User[]> {
    if(company) {
      return of(this.recruiters
        .filter((payload) => payload.permission.affiliation.id === company.id))
    }
    return of(this.recruiters)
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
