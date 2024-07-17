import { Lab } from './lab.model';

export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  cabinet: string;
  labs: Lab[];
}
