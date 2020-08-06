import { round } from 'lodash';
import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltyType } from '@kirby/novelty-types/data';

export class NoveltyModel {
  id: string;
  sub_cost_center_id: string;
  time_clock_log_id: string;
  employee_id: string;
  novelty_type_id: string;
  start_at?: Date;
  end_at?: Date;
  comment: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  employee?: EmployeeInterface;
  subCostCenter?: any;
  sub_cost_center?: any;
  time_clock_log?: any;
  novelty_type?: NoveltyType;
  approvals: any[];

  static fromJson(data: any): NoveltyModel {
    return Object.assign(new NoveltyModel(), {
      ...data,
      start_at: data.start_at ? new Date(data.start_at) : null,
      end_at: data.end_at ? new Date(data.end_at) : null,
    });
  }

  static fromJsonList(arr: any[]): NoveltyModel[] {
    return arr.map((data) => NoveltyModel.fromJson(data));
  }

  isApprovedByUserId(userId: string): boolean {
    return (
      this.approvals &&
      this.approvals.map((approver) => approver.id).includes(userId)
    );
  }

  get time_difference(): number | null {
    return this.start_at && this.end_at
      ? this.end_at.getTime() - this.start_at.getTime()
      : null;
  }

  get total_time_in_hours(): number {
    return this.time_difference ? round(this.time_difference / 3.6e6, 2) : 0;
  }
}
