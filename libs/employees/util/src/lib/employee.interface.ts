import { User } from '@kirby/users/util';
import { CostCenter } from '@kirby/cost-centers/data';
import { WorkShiftInterface } from '@kirby/work-shifts/util/src';

export interface IdentificationsInterface {
  employee_id: string;
  name: string;
  code: string;
}

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
  user?: User;
  costCenter?: CostCenter;
  workShifts?: WorkShiftInterface[];
  identifications?: IdentificationsInterface[];
  created_at: string;
  updated_at: string;
}
