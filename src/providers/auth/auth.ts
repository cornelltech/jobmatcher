import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsersProvider } from '../users/users';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Permission } from '../../models/permission';
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

    hasValidSession$:Observable<boolean>;

    constructor(public afAuth: AngularFireAuth, private toastCtrl: ToastController, private users:UsersProvider) {
        this.hasValidSession$ = this.afAuth.authState
            .map((payload) => payload && payload !== undefined);
    }

    register$(email:string, password:string, name:string, userType:'recruiter' | 'student'):Observable<User | null> {
        let source = new ReplaySubject<User>(1);

        this.afAuth.auth
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((payload) => {
                const uid:string = payload.user ? payload.user.uid : null;
                const obj:User = {
                    id: uid,
                    name: name,
                    email: email,
                    permission: {
                        userType: userType,
                        affiliation: null
                    },
                    jobs: []
                }
                this.users.create(obj);

                console.log('done, emit next')

                source.next(obj);
            })
            .catch((err) => {
                this.toastCtrl
                    .create({
                        message: `Sorry, we can't sign you up with these credentials`,
                        duration: 3000,
                        position: 'bottom'
                    })
                    .present();
            });

        return source;
    }


    login(email:string, password:string) {
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err);
                this.toastCtrl
                    .create({
                        message: `Sorry, we can't log you in with these credentials`,
                        duration: 3000,
                        position: 'bottom'
                    })
                    .present();
            })
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}