import {Permission} from './permission';
import {Job} from './job';

export interface User{
  id:string;
  name: string;
  email: string;
  permission: Permission;
  jobs: Job[];
}
