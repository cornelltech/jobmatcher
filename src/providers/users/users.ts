import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
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
  users$:Observable<User[]>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.list$ = db.list('list').valueChanges();
    this.users$ = db.list('users').snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.val() as User;
          data.id = a.payload.key;
          return data as User;
        })
      });
  }

  lookup$(uid:string):Observable<User> {
    return this.users$
      .map((users) => users
        .find((user) => user.uid === uid));
  }

  lookupById$(key:string):Observable<User> {
    return this.users$
      .map((users) => users
        .find((user) => user.id === key));
  }

  fetchUserKey$(uid:string):Observable<string> {
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

  // TODO: add filter for favorite jobs, probably need to change isFavoritedJob
  fetchStudents$():Observable<Student[]> {
    return this.users$
      .map((users) => users
        .filter((user) => user.permission.userType === 'student')
        .map((student) => student as Student))
  }

  fetchInterestedStudents$(jobId:string):Observable<Student[]> {
    return this.fetchStudents$()
      .map((students) => students
        .filter((student) =>
          (Object as any).values(student.jobs).indexOf(jobId) > -1
        )
      )
  }


  // TODO: add filter for companies, need to add company data first...
  fetchRecruiters$(company:Company=null):Observable<User[]> {
    return this.users$
      .map((users) => users
        .filter((user) => user.permission.userType === 'recruiter'))
        // .filter((payload) => payload.permission.affiliation.id === company.id))
  }

  fetchStudent$(uid: string):Observable<Student> {
    return this.fetchStudents$()
      .map((students) => students
        .find((student) => student.uid === uid));
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
      .map((payload) => payload.permission);
  }

  fetchMyFavoriteJobs$():Observable<any[]> {
    return this.fetchMe$()
      .switchMap((payload) => {
        return this.fetchUserKey$(payload.uid)
      })
      .switchMap((userKey) => {
        const itemRef = this.db.list(`users/${userKey}/jobs`);
        // itemRef.valueChanges().subscribe((payload) => /**console.log(payload)**/{});
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
          //console.log("adding job", id)
        } else {
          //console.log("job already exists in list, not adding")
        }
      })
    }))
  }

  unfavoriteJob(id:string, userUid:string=null):void {
    const uid:string = userUid ? userUid : this.afAuth.auth.currentUser.uid;
    this.fetchUserKey$(uid).take(1).subscribe((userKey => {
      const itemRef = this.db.list(`users/${userKey}/jobs`);
      itemRef.valueChanges().take(1).subscribe((payload) => {
        if(payload.indexOf(id) === -1) {
          //console.log("job doesn't exist to unfavorite (how did you get here)", id)
        } else {
          //console.log("deleting job", id)
          this.lookup$(uid).take(1).subscribe((payload) => {
            Object.keys(payload.jobs).forEach((key) => {
              if (payload.jobs[key] === id) {
                //console.log("deleting job", id, "from faves list, key", key);
                itemRef.remove(key);
              }
            })
          })
        }
      })
    }))
  }

  isFavoritedJob$(id:string, studentUid:string=null):Observable<boolean> {
    let user = (studentUid == null) ? this.fetchMe$() : this.fetchStudent$(studentUid);
    return user
      .switchMap((payload) => {
        return this.fetchUserKey$(payload.uid)
      })
      .switchMap((userKey) => {
        const itemRef = this.db.list(`users/${userKey}/jobs`);
        itemRef.valueChanges().take(1).subscribe((payload) => /**console.log(payload)*/{});
        return itemRef.valueChanges().map((payload) => payload.indexOf(id) !== -1);
      })
  }

  affiliate(orgId:string):void {
    const uid:string = this.afAuth.auth.currentUser ?
      this.afAuth.auth.currentUser.uid : '';

    this.fetchUserKey$(uid).take(1).subscribe((userKey => {
      const itemRef = this.db.object(`users/${userKey}/permission/affiliation`);
      itemRef.set(orgId);
    }));
  }

  update(id:string, obj:User):void {
    try {
      const itemRef = this.db.object(`users/${id}`);
      delete obj.id; // cause firebase
      itemRef.update(obj);
    } catch (error) {
      console.log(error)
    }
  }

}
