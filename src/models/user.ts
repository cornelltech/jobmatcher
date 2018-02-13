import {Permission} from './permission';
import {Job} from './job';

export interface User{
  // id:string;
  uid:string;
  name: string;
  email: string;
  permission: Permission;
  jobs: any;
}

export interface Student extends User {
  year:number;
  program: 'CS' | 'CM' | 'HT' | 'LLM' | 'MBA' | 'ORIE' | 'ECE' | 'DESIGN';
  resumeLink: string;
}
