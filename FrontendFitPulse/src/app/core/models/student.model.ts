import { Lab } from './lab.model';

export interface Student {
  id: string;
  fullName: string;
  email: string;
  year: number;
  identificationNumber: string;
  group: string;
  labs: Lab[];
}
