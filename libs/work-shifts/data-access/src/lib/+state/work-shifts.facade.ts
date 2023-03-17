import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { workShiftsQuery } from './work-shifts.selectors';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { workShiftsActionTypes as actions } from './work-shifts.actions';

@Injectable()
export class WorkShiftsFacade {
  paginatedWorkShifts$ = this.store.pipe(select(workShiftsQuery.getPaginatedWorkShifts));
  getWorkShiftsList$ = this.store.pipe(select(workShiftsQuery.getWorkShiftsList));
  paginatingStatus$ = this.store.pipe(select(workShiftsQuery.paginatingStatus));
  creatingStatus$ = this.store.pipe(select(workShiftsQuery.creatingStatus));
  selectedWorkShift$ = this.store.pipe(select(workShiftsQuery.getSelectedWorkShift));
  selectingStatus$ = this.store.pipe(select(workShiftsQuery.selectingStatus));
  updatingStatus$ = this.store.pipe(select(workShiftsQuery.updatingStatus));
  deletingStatus$ = this.store.pipe(select(workShiftsQuery.deletingStatus));
  error$ = this.store.pipe(select(workShiftsQuery.getError));

  constructor(private store: Store<WorkShiftsPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(actions.search(query));
  }

  create(workShift: WorkShiftInterface) {
    this.store.dispatch(actions.create(workShift));
  }

  get(id: string) {
    this.store.dispatch(actions.get(id));
  }

  update(id: string, workShift: WorkShiftInterface) {
    this.store.dispatch(actions.update({ id, data: workShift }));
  }

  cleanSelected() {
    this.store.dispatch(actions.getOk(null));
  }

  delete(id: string) {
    this.store.dispatch(actions.delete(id));
  }
}
