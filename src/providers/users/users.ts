import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Permission } from '../../models/permission';
import { User, Student } from '../../models/user';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  // me:User = {
  //   id: "xvw8wwboqAfr9609pReU9FRIAtN2",
  //   name: "adrian vatchinsky",
  //   email: "avatchinsky@outlook.com",
  //   permission: {
  //     userType: "student",
  //     affiliation: {
  //       id: 'ct',
  //       name: 'cornell tech2',
  //       description: 'yolo',
  //       link: null,
  //       logo: null
  //     }
  //   },
  //   jobs: [
  //     {
  //       id: 'stusfdffsd',
  //       title: 'something',
  //       description: `
  //       RegExr v3 was created by gskinner.com, and is proudly hosted by Media Temple.

  //       Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & Javascript flavors of RegEx are supported.

  //       The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community, and view patterns you create or favorite in My Patterns.

  //       Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.

  //       `,
  //       location: 'nevada',
  //       company: {
  //         id: 'ct2',
  //         name: 'cornell tech2',
  //         description: 'yolo',
  //         link: null,
  //         logo: null
  //       },
  //       requirements: {
  //         id: 'sesodnsdsdsd',
  //         visa: 'visa1',
  //         balla: true
  //       },
  //       session: null
  //     },
  //   ]
  // }

  list$:Observable<any>;

  recruiters:User[] = []

  students:Student[] = [
    {
      id: 'abcde',
      name: 's do',
      email: 'jon@example.com',
      permission: {
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
        userType: 'student',
        affiliation: null
      },
      jobs: [],
      year: 2019,
      program: 'ORIE',
      resumeLink: 'https://angular-mfppay.stackblitz.io/'
    }
  ]

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.list$ = db.list('list').valueChanges();
  }

  lookup$(id:string):Observable<User> {
    return this.db
      .list('/users',
          ref => ref.orderByChild('id').equalTo(id)
      )
      .valueChanges()
      .map((payload:User[]) =>
        payload.length > 0 ? payload[0] : null
      );
    }

  create(user:User):void {
    const itemRef = this.db.list('users');
    itemRef.push(user);
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
    const uid:string = this.afAuth.auth.currentUser ?
      this.afAuth.auth.currentUser.uid : '';

    return this.lookup$(uid);
    // return of(this.me);
  }

  fetchMyPermissions$():Observable<Permission> {
    return this.fetchMe$()
      .filter((payload) => 
        payload && payload !== undefined)
      .map((payload) => 
        payload.permission);
  }

  favoriteJob(job:Job):void {
    // this.me.jobs = [job, ...this.me.jobs];
  }

  unfavoriteJob(job:Job):void {
    // this.me.jobs = this.me.jobs.filter((payload) => payload.id !== job.id);
  }

  isFavoritedJob(job:Job):boolean {
    // return this.me.jobs.some((payload) => payload.id === job.id);
    return false;
  }

}
