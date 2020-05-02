import { uniqBy } from 'lodash';

import { NoveltyModel } from './novelty.model';
import { EmployeeInterface } from '@kirby/employees/util';
import { User } from '@kirby/users/util/src';

class ReportRow {
  date: string;
  employee: EmployeeInterface;
  novelties: NoveltyModel[];

  get subCostCenters(): any[] {
    return uniqBy(
      this.novelties.map(n => n.sub_cost_center).filter(s => !!s),
      'id'
    );
  }

  get costCenters(): any[] {
    return uniqBy(
      this.novelties
        .map(n => n.sub_cost_center)
        .filter(s => !!s)
        .map(scc => scc.cost_center)
        .filter(cc => !!cc),
      'id'
    );
  }

  get approvals(): any[] {
    return uniqBy(
      [].concat.apply([], this.novelties.map(n => n.approvals)),
      'id'
    );
  }

  get comments(): any[] {
    return this.novelties
      .map(n => n.comment)
      .filter(c => !!c && c.trim() !== '');
  }

  get totalHours(): number {
    return (
      this.novelties
        .map(novelty => novelty.total_time_in_hours)
        .reduce((acc, hours) => acc + hours, 0)
    );
  }

  userHasApprovals(user: User): boolean {
    return (
      user &&
      this.approvals
        .map(approval => approval.id)
        .filter(approvalId => approvalId === user.id).length > 0
    );
  }

  userHasAnyToApprove(userId: string): boolean {
    return (
      this.approvals.length == 0 ||
      (userId &&
        this.approvals
          .map(approval => approval.id)
          .filter(approvalId => approvalId !== userId).length > 0)
    );
  }
}

export class NoveltyReport {
  data: ReportRow[];

  constructor(data: any[]) {
    this.data = data.map(row =>
      Object.assign(new ReportRow(), {
        ...row,
        novelties: NoveltyModel.fromJsonList(row.novelties)
      })
    );
  }

  get employee(): any {
    return this.data && this.data.length > 0 ? this.data[0].employee : null;
  }

  get length(): number | null {
    return this.data ? this.data.length : null;
  }
}
