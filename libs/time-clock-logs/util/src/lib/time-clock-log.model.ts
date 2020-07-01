import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

export class TimeClockLogModel {
  id?: string;
  employee_id: string;
  employee: EmployeeInterface;
  work_shift_id?: string;
  work_shift?: WorkShiftInterface;
  checked_in_at: string;
  checked_out_at?: string;
  checked_in_by_id: string;
  checked_in_by: User;
  sub_cost_center?: any;
  checked_out_by_id?: string;
  checked_out_by?: User;
  novelties_count?: number;
  novelties?: NoveltyModel[];
  approvals?: User[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  static fromJson(data: any): TimeClockLogModel {
    return Object.assign(new TimeClockLogModel(), data, {
      novelties: data.novelties
        ? NoveltyModel.fromJsonList(data.novelties)
        : [],
      approvals: data.approvals ? User.fromJsonList(data.approvals) : []
    });
  }

  static fromJsonList(arr: any[]): TimeClockLogModel[] {
    return arr.map(data => TimeClockLogModel.fromJson(data));
  }

  isApprovedByUserId(userId: string): boolean {
    return (
      this.approvals &&
      this.approvals.map(approver => approver.id).includes(userId)
    );
  }
}
