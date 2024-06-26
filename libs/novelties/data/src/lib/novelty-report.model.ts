import { uniqBy, groupBy, toArray, round } from 'lodash-es';

import { NoveltyModel } from './novelty.model';
import { EmployeeInterface } from '@kirby/employees/util';
import { User } from '@kirby/users/util';

class ReportRow {
  date: string;
  employee: EmployeeInterface;
  novelties: NoveltyModel[];

  get subCostCenters(): any[] {
    return uniqBy(
      this.novelties.map((n) => n.sub_cost_center).filter((s) => !!s),
      'id'
    );
  }

  get costCenters(): any[] {
    return uniqBy(
      this.novelties
        .map((n) => n.sub_cost_center)
        .filter((s) => !!s)
        .map((scc) => scc.cost_center)
        .filter((cc) => !!cc),
      'id'
    );
  }

  get approvals(): any[] {
    return uniqBy(
      [].concat.apply(
        [],
        this.novelties.map((n) => n.approvals)
      ),
      'id'
    );
  }

  get comments(): any[] {
    return this.novelties.map((n) => n.comment).filter((c) => !!c && c.trim() !== '');
  }

  get totalHours(): number {
    return round(
      this.novelties.map((novelty) => novelty.total_time_in_hours).reduce((acc, hours) => acc + hours, 0),
      2
    );
  }

  userHasApprovals(user: User): boolean {
    return (
      user && this.approvals.map((approval) => approval.id).filter((approvalId) => approvalId === user.id).length > 0
    );
  }

  userHasAnyToApprove(userId: string): boolean {
    return (
      this.approvals.length === 0 ||
      (userId && this.approvals.map((approval) => approval.id).filter((approvalId) => approvalId !== userId).length > 0)
    );
  }
}

const shiftHoursMap = {
  A: [22, 23, 0, 1, 2, 3, 4, 5],
  O: [6, 7, 8, 9, 10, 11, 12, 13],
  T: [14, 15, 16, 17, 18, 19, 20, 21],
};

export class NoveltyReport {
  data: ReportRow[];

  constructor(data: any) {
    const mappedData = NoveltyModel.fromJsonList(data.data).map((novelty) => ({
      ...novelty,
      grouping_date: new Date(novelty.time_clock_log?.checked_out_at || novelty.end_at).setHours(0, 0, 0, 0),
    }));

    this.data = toArray(groupBy(mappedData, 'grouping_date'))
      .map((row) =>
        Object.assign(new ReportRow(), {
          date: row[0].grouping_date,
          employee: row[0].employee,
          novelties: NoveltyModel.fromJsonList(row).sort((a, b) => (a.start_at < b.start_at ? -1 : 1)),
        })
      )
      .map((r) => {
        const noveltiesSortedByMostTimeConsuming = [...r.novelties].sort((a, b) => {
          const aTime = a.end_at - a.start_at;
          const bTime = b.end_at - b.start_at;

          return aTime > bTime ? -1 : 1;
        });

        r.foo = noveltiesSortedByMostTimeConsuming.map((n) => ({
          n: n.novelty_type.code,
          s: n.start_at.toISOString(),
          e: n.end_at.toISOString(),
        }));

        r.shift =
          Object.keys(shiftHoursMap).filter((shift) =>
            shiftHoursMap[shift].includes(noveltiesSortedByMostTimeConsuming[0].start_at.getHours())
          )[0] || '---';

        return r;
      });
  }

  get employee(): any {
    return this.data && this.data.length > 0 ? this.data[0].employee : null;
  }

  get length(): number | null {
    return this.data ? this.data.length : null;
  }
}
