import {Company} from './company';
import {Requirement} from './requirement';
import {Session} from './session';

export interface Job {
  id:string;
  title: string;
  description: string;
  location: string;
  company: string;
  requirements: Requirement;
  session: Session;
  students: string[];
  blacklist: string[];
  status?: 'intern' | 'ft';
  visa?: 'yes' | 'no' | 'sometimes';
  degree?: 'MBA' | 'technical' | 'any';
}
