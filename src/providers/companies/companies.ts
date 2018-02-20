import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AngularFireDatabase } from 'angularfire2/database';

import { Company } from '../../models/company';
/*
  Generated class for the CompaniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompaniesProvider {
  companies$:Observable<Company[]>;

  constructor(private db: AngularFireDatabase,) {
    this.companies$ = db.list('companies').snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.val() as Company;
          data.id = a.payload.key;
          return data;
        })
      });
  }

  fetchCompanies$():Observable<Company[]> {
    return this.companies$;
  }

  fetchCompany$(key:string):Observable<Company> {
    return this.companies$.map((objs) =>
      objs.find((obj) => obj.id === key));
  }

  lookupCompany$(name:string):Observable<Company> {
    return this.companies$.map((objs) =>
      objs.find((obj) => obj.name === name));
  }

  create(name:string) {
    const itemRef = this.db.list('companies');
    const payload:Company = {
        name,
    };
    itemRef.push(payload);
  }

  update(id:string, obj:Company):void {
    try {
      const itemRef = this.db.object(`companies/${id}`);
      delete obj.id; // cause firebase
      itemRef.update(obj);
    } catch (error) {
      console.log(error)
    }
    
  }

}
