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
  list$:Observable<any>;

  recruiters:User[] = []
  faveJobs:string[] = [
    '-L4IF5Rjksb2dXDMK9_7',
  ]

  students:Student[] = [
    {
      uid: 'abcde',
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
      uid: 'abcdefffffffff',
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
      uid: 'abcadfdsdde',
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
      uid: 'adfdsdde',
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

  lookup$(uid:string):Observable<User> {
    return this.db
      .list('/users',
          ref => ref.orderByChild('uid').equalTo(uid)
      )
      .valueChanges()
      .map((payload:User[]) =>
        payload.length > 0 ? payload[0] : null
      );
  }

  fetchUserKey$(uid:string):Observable<string> {
    console.log("in fetchuserkey");
    return this.db
      .list('/users',
            ref => ref.orderByChild('uid').equalTo(uid)
          )
      .snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.val() as User;
          const key = a.payload.key;
          return { key, ...data };
        })
        .find((payload) => {
          return payload.uid === uid
        })
      })
      .map((payload) => {
        return payload.key;
      });
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
      .find((obj) => obj.uid === key);
    return of(item);
  }

  fetchMe$():Observable<User> {
    const uid:string = this.afAuth.auth.currentUser ?
      this.afAuth.auth.currentUser.uid : '';
    return this.lookup$(uid);
  }

  fetchMyPermissions$():Observable<Permission> {
    return this.fetchMe$()
      .filter((payload) =>
        payload && payload !== undefined)
      .map((payload) =>
        payload.permission);
  }

  fetchMyFavoriteJobs$():Observable<any[]> {
    return this.fetchMe$()
      .switchMap((payload) => {
        return this.fetchUserKey$(payload.uid)
      })
      .switchMap((userKey) => {
        const itemRef = this.db.list(`users/${userKey}/jobs`);
        itemRef.valueChanges().subscribe((payload) => console.log(payload));
        return itemRef.valueChanges();
    })
  }

  favoriteJob(id:string):void {
    const uid:string = this.afAuth.auth.currentUser ?
      this.afAuth.auth.currentUser.uid : '';

    this.fetchUserKey$(uid).take(1).subscribe((userKey => {
      const itemRef = this.db.list(`users/${userKey}/jobs`);
      itemRef.valueChanges().take(1).subscribe((payload) => {
        if(payload.indexOf(id) === -1) {
          itemRef.push(id);
          console.log("adding job", id)
        } else {
          console.log("job already exists in list, not adding")
        }
      })
    }))
  }

  unfavoriteJob(id:string):void {
    const uid:string = this.afAuth.auth.currentUser ?
      this.afAuth.auth.currentUser.uid : '';
    this.fetchUserKey$(uid).take(1).subscribe((userKey => {
      const itemRef = this.db.list(`users/${userKey}/jobs`);
      itemRef.valueChanges().take(1).subscribe((payload) => {
        if(payload.indexOf(id) === -1) {
          console.log("job doesn't exist to unfavorite (how did you get here)", id)
        } else {
          console.log("deleting job", id)
          this.fetchMe$().take(1).subscribe((payload) => {
            Object.keys(payload.jobs).forEach((key) => {
              if (payload.jobs[key] === id) {
                console.log("deleting job", id, "from faves list, key", key);
                itemRef.remove(key);
              }
            })
          })
        }
      })
    }))
  }

  isFavoritedJob$(id:string):Observable<boolean> {
    return this.fetchMe$()
      .switchMap((payload) => {
        return this.fetchUserKey$(payload.uid)
      })
      .switchMap((userKey) => {
        const itemRef = this.db.list(`users/${userKey}/jobs`);
        itemRef.valueChanges().take(1).subscribe((payload) => console.log(payload));
        return itemRef.valueChanges().map((payload) => payload.indexOf(id) !== -1);
      })
  }

}
