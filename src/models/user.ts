import {Permission} from './permission';
import {Job} from './job';

export interface User{
  name: string;
  email: string;
  permission: Permission;
  job: Job[];
}
