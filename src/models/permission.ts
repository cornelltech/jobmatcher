import {Company} from './company';

export interface Permission{
  userType: 'administrator' | 'recruiter' | 'student';
  affiliation: string;
}
