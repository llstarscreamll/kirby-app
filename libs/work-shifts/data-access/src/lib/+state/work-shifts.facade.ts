import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { WorkShiftsPartialState } from './work-shifts.reducer';
import { workShiftsQuery } from './work-shifts.selectors';
import { LoadWorkShifts } from './work-shifts.actions';

@Injectable()
export class WorkShiftsFacade {
  loaded$ = this.store.pipe(select(workShiftsQuery.getLoaded));
  allWorkShifts$ = this.store.pipe(select(workShiftsQuery.getAllWorkShifts));
  selectedWorkShifts$ = this.store.pipe(
    select(workShiftsQuery.getSelectedWorkShifts)
  );

  constructor(private store: Store<WorkShiftsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadWorkShifts());
  }
}
