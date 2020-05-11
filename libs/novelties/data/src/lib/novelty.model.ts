import { round } from 'lodash';
import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export class NoveltyModel {
  id: string;
  sub_cost_center_id: string;
  time_clock_log_id: string;
  employee_id: string;
  novelty_type_id: string;
  scheduled_start_at?: Date;
  scheduled_end_at?: Date;
  comment: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  employee?: EmployeeInterface;
  subCostCenter?: any;
  sub_cost_center?: any;
  time_clock_log?: any;
  novelty_type?: NoveltyTypeInterface;
  approvals: any[];

  static fromJson(data: any): NoveltyModel {
    return Object.assign(new NoveltyModel(), {
      ...data,
      scheduled_start_at: data.scheduled_start_at
        ? new Date(data.scheduled_start_at)
        : null,
      scheduled_end_at: data.scheduled_end_at
        ? new Date(data.scheduled_end_at)
        : null
    });
  }

  static fromJsonList(arr: any[]): NoveltyModel[] {
    return arr.map(data => NoveltyModel.fromJson(data));
  }

  isApprovedByUserId(userId: string): boolean {
    return (
      this.approvals &&
      this.approvals.map(approver => approver.id).includes(userId)
    );
  }

  get time_difference(): number | null {
    return this.scheduled_start_at && this.scheduled_end_at
      ? this.scheduled_end_at.getTime() - this.scheduled_start_at.getTime()
      : null;
  }

  get total_time_in_hours(): number {
    return this.time_difference ? round(this.time_difference / 3.6e6, 2) : 0;
  }
}
