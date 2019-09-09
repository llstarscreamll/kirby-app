import { UserInterface } from '@llstarscreamll/users/util';

export interface EmployeeInterface {
  id?: string;
  cost_center_id?: string;
  first_name: string;
  last_name: string;
  code: string;
  identification_number: string;
  position: string;
  location: string;
  address: string;
  phone: string;
  salary: string;
  user?: UserInterface;
  created_at: string;
  updated_at: string;
}
