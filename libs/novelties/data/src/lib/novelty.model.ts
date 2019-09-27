import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export class NoveltyModel {
  id: string;
  time_clock_log_id: string;
  employee_id: string;
  employee?: EmployeeInterface;
  novelty_type_id: string;
  novelty_type?: NoveltyTypeInterface;
  start_at?: string;
  end_at?: string;
  total_time_in_minutes: number;
  approvals: any[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

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
}
