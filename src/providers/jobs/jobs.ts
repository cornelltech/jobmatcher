import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';

import { Job } from '../../models/job';
import { User, Student } from '../../models/user';

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
    //console.log('Hello JobsProvider Provider');
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
    return Observable.combineLatest(
      this.jobs$,
      this.usersProvider.fetchMe$(),
      (jobs:Job[], me:User) => ({jobs, me})
    )
    .map((payload) => payload.jobs
      .filter((job) => {
        if(job.blacklist) {
          return (Object as any).values(job.blacklist).indexOf(payload.me.uid) == -1;
        } else {
          return true; // this job has no blacklist
        }
      })
      .filter((job) => {
        // ft vs intern
        if('year' in payload.me) {
          let grad = (payload.me as Student).year;
          const isFt:boolean = job.status == 'ft';
          return grad > 2018 ? !isFt : isFt;
        }
        return true;
      })
      .filter((job) => {
        // visas
        if('needsVisa' in payload.me) {
          const needsVisa:boolean = (payload.me as Student).needsVisa == 'true';
          return needsVisa ? (['yes', 'sometimes'].indexOf(job.visa) > -1) : true;
        }
        return true;
      })
      .filter((job) => {
        // degrees
        if('program' in payload.me) {
          let mba = (payload.me as Student).program == 'MBA';
          if(job.degree == 'MBA') {
            return mba;
          } else if(job.degree == 'technical') {
            return !mba;
          }
        }
        // job accepts any degree, or user is not a student
        return true;
      })
    );
  }

  fetchJobsForCompany$(companyId:string):Observable<Job[]> {
    return this.fetchJobs$()
      .map((payload) => payload
        .filter((obj) => obj.company === companyId)
      );
  }

  fetchJob$(key:string):Observable<Job> {
    return this.jobs$.map((jobs) =>
      jobs.find((job) => job.id === key));
  }

  fetchMyFavoriteJobs$():Observable<Job[]> {
    return Observable
      .combineLatest(
        this.jobs$,
        this.usersProvider.fetchMyFavoriteJobs$(),
          (jobs:Job[], ids:string[]) =>
            ({jobs, ids})
          )
          .map((payload) =>
            payload.ids.map((key) =>
              payload.jobs.find((obj) => obj.id == key)
            )
          )
  }

  createJobListing(job:Job) {
    try {
      const itemRef = this.db.list('jobs');
      itemRef.push(job);
    } catch(error) {
      console.log(error);
    }
  }

  addToBlacklist(jobId:string, studentUid:string) {
    this.fetchJob$(jobId).take(1).subscribe((job) =>
      {
        const itemRef = this.db.list(`jobs/${jobId}/blacklist`);
        itemRef.valueChanges().take(1).subscribe((payload) => itemRef.push(studentUid));
      })
  }

  // default to student=self
  addCurrentUserToInterestedStudentsList(jobId:string) {
    this.usersProvider.fetchMe$().take(1).subscribe((me) => {
      const itemRef = this.db.list(`jobs/${jobId}/students`);
      itemRef.push(me.uid);
    })
  }

  // defaults to user = me
  removeUserFromInterestedStudentsList(jobId:string, studentUid:string=null) {
    let user = (studentUid === null) ? this.usersProvider.fetchMe$() : this.usersProvider.fetchStudent$(studentUid);
    user.take(1).subscribe((student) => {
      const itemRef = this.db.list(`jobs/${jobId}/students`);
      itemRef.valueChanges().take(1).subscribe((payload) => {
        if(payload.indexOf(student.uid) === -1) {
          // console.log('??? this student not in list')
        } else {
          this.fetchJob$(jobId).take(1).subscribe((payload) => {
            Object.keys(payload.students).forEach((key) => {
              if (payload.students[key] === student.uid) {
                itemRef.remove(key);
              }
            })
          })
        }
      })
    })
  }

}
