export interface Requirement{
  id:string;
  visa: 'Sponsors H1Bs' | 'H1Bs on a case-by-case basis' | 'Does not sponsor H1Bs';
  fulltime?: 'intern' | 'full-time'
}
