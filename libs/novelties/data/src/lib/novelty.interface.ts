import { EmployeeInterface } from '@llstarscreamll/employees/util';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';

export interface NoveltyInterface {
  id: number;
  time_clock_log_id: string;
  employee_id: string;
  employee?: EmployeeInterface;
  novelty_type_id: string;
  novelty_type?: NoveltyTypeInterface;
  start_at?: string;
  end_at?: string;
  total_time_in_minutes: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
