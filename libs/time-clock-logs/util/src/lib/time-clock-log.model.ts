import { WorkShiftInterface } from "@llstarscreamll/work-shifts/util";
import { UserInterface } from "@llstarscreamll/users/util";
import { EmployeeInterface } from '@llstarscreamll/employees/util';
import { NoveltyInterface } from '@llstarscreamll/novelties/data';
import { round } from 'lodash';

export class TimeClockLogModel {
  id?: string;
  employee_id: string;
  employee: EmployeeInterface;
  work_shift_id?: string;
  work_shift?: WorkShiftInterface;
  checked_in_at: string;
  checked_out_at?: string;
  checked_in_by_id: string;
  checked_in_by: UserInterface;
  checked_out_by_id?: string;
  checked_out_by?: UserInterface;
  novelties_count?: number;
  novelties?: NoveltyInterface[];
  approvals?: { id: string, first_name: string, last_name: string }[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  public static fromJson(data: any): TimeClockLogModel {
    return Object.assign(new TimeClockLogModel(), data);
  }

  public static fromJsonList(arr: any[]): TimeClockLogModel[] {
    return arr.map(data => TimeClockLogModel.fromJson(data));
  }

  public get concatenatedNoveltiesCount(): string {
    return (this.novelties || []).map(novelty => novelty.novelty_type.code + ' ' + round(novelty.total_time_in_minutes / 60, 2)).join(', ');
  }
}
