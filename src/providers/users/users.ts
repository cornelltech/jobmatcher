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
    name: 's do',
    email: 'jon@example.com',
    permission: {
      id: 'fghijk',
      userType: 'recruiter',
      affiliation: {
        id: 'ct',
        name: 'cornell tech',
        description: 'yolo',
        link: null,
        logo: null
      },
    },
    jobs: []
  }

  recruiters:User[] = []

  students:Student[] = [
    {
      id: 'abcde',
      name: 's do',
      email: 'jon@example.com',
      permission: {
        id: 'fghijk',
        userType: 'student',
        affiliation: {
          id: 'ct',
          name: 'cornell tech',
          description: 'yolo',
          link: null,
          logo: null
        },
      },
      jobs: [],
      year: 2019,
      program: 'LLM',
      resumeLink: 'https://angular-mfppay.stackblitz.io/'
    },
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
      resumeLink: 'https://angular-mfppay.stackblitz.io/'
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
      resumeLink: 'https://angular-mfppay.stackblitz.io/'
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
      resumeLink: 'https://angular-mfppay.stackblitz.io/'
    }
  ]

  constructor() {
    console.log('Hello UsersProvider Provider');
  }

  fetchStudents$(job:Job=null):Observable<Student[]> {
    return of(this.students)
  }

  fetchRecruiters$(company:Company=null):Observable<User[]> {
    if(company) {
      return of(this.recruiters
        .filter((payload) => payload.permission.affiliation.id === company.id))
    }
    return of(this.recruiters)
  }

  fetchStudent$(key: string):Observable<Student> {
    const item:Student = this.students
      .find((obj) => obj.id === key);
    return of(item);
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
