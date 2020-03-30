import { round } from "lodash";
import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export class NoveltyModel {
  id: string;
  sub_cost_center_id: string;
  time_clock_log_id: string;
  employee_id: string;
  novelty_type_id: string;
  scheduled_start_at?: string;
  scheduled_end_at?: string;
  total_time_in_minutes: number;
  comment: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  
  employee?: EmployeeInterface;
  subCostCenter?: any;
  sub_cost_center?: any;
  novelty_type?: NoveltyTypeInterface;
  approvals: any[];

  public static fromJson(data: any): NoveltyModel {
    return Object.assign(new NoveltyModel(), data);
  }

  public static fromJsonList(arr: any[]): NoveltyModel[] {
    return arr.map(data => NoveltyModel.fromJson(data));
  }

  public isApprovedByUserId(userId: string): boolean {
    return (
      this.approvals &&
      this.approvals.map(approver => approver.id).includes(userId)
    );
  }

  public get total_time_in_hours() {
    return round(this.total_time_in_minutes / 60, 2);
  }
}
