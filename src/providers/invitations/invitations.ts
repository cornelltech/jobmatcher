import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';

import { guid } from '../../utilities/helpers';
import { Invitation } from '../../models/invitation';
import * as firebase from 'firebase/app';


@Injectable()
export class InvitationsProvider {

    constructor(private db: AngularFireDatabase) { }

    create(target:string, name:string, permissionScope:'recruiter' | 'student'='student', affiliationId:string=null) {
        const itemRef = this.db.list('invitations');
        const uuid:string = guid();
        const isSent:boolean = false;
        const payload:Invitation = {
            uuid,
            target,
            permissionScope,
            affiliationId,
            isSent,
            name
        };

        itemRef.push(payload);
    }

    lookup$(code:string):Observable<Invitation> {
        return this.db
            .list('/invitations',
                ref => ref.orderByChild('uuid').equalTo(code)
            )
            .valueChanges()
            .map((payload:Invitation[]) =>
                payload.length > 0 ? payload[0] : null
            );
    }

}