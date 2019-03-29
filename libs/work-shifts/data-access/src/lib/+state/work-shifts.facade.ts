import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { workShiftsQuery } from './work-shifts.selectors';
import { SearchWorkShifts } from './work-shifts.actions';
import { WorkShiftsPartialState } from './work-shifts.reducer';

@Injectable()
export class WorkShiftsFacade {
  public loaded$ = this.store.pipe(select(workShiftsQuery.getLoaded));
  public paginatedWorkShifts$ = this.store.pipe(select(workShiftsQuery.getPaginatedWorkShifts));
  public selectedWorkShift$ = this.store.pipe(select(workShiftsQuery.getSelectedWorkShift));

  public constructor(private store: Store<WorkShiftsPartialState>) { }

  public paginate(query: any = {}) {
    this.store.dispatch(new SearchWorkShifts(query));
  }
}
