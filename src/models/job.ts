import {Company} from './company';
import {Requirement} from './requirement';
import {Session} from './session';

export interface Job {
  id:string;
  title: string;
  description: string;
  location: string;
  company: Company;
  requirements: Requirement;
  session: Session;
}
