import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Company } from '../../models/company';
import { Job } from '../../models/job';
import { Permission } from '../../models/permission';
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

    hasValidSession$:Observable<boolean>;

    constructor(public afAuth: AngularFireAuth) {
        this.hasValidSession$ = this.afAuth.authState
            .map((payload) => payload && payload !== undefined);
    }

    register(email:string, password:string) {
        this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
    }


    login(email:string, password:string) {
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}