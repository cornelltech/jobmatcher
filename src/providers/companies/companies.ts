import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Company } from '../../models/company';
/*
  Generated class for the CompaniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompaniesProvider {
  companies: Company[] = [
    {
      id:'alsdfsd',
      name: 'google',
      description: `For applications of DFS in relation to specific domains,
      such as searching for solutions in artificial intelligence or web-crawling,
      the graph to be traversed is often either too large to visit in its entirety
      or infinite (DFS may suffer from non-termination). In such cases, search is
      only performed to a limited depth; due to limited resources, such as memory
      or disk space, one typically does not use data structures to keep track of
      the set of all previously visited vertices.`,
      link: 'www.google.com',
      logo: null
    },
    {
      id:'alddddsdfsd',
      name: 'amazon',
      description: 'makes $$ searches',
      link: 'www.amazon.com',
      logo: null
    }
  ]

  constructor() {
    console.log('Hello CompaniesProvider Provider');
  }

  fetchCompanies$():Observable<Company[]> {
    return of(this.companies);
  }

  fetchCompany$(key:string):Observable<Company> {
    const item:Company = this.companies
      .find((obj) => obj.id === key);
    return of(item);
  }

}
