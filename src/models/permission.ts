import {Company} from './company';

export interface Permission{
  id:string;
  userType: 'administrator' | 'recruiter' | 'student';
  affiliation: Company;
}
