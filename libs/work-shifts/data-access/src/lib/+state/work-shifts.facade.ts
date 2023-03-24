import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as selectors from './work-shifts.selectors';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { workShiftsActionTypes as actions } from './work-shifts.actions';

@Injectable()
export class WorkShiftsFacade {
  paginatedWorkShifts$ = this.store.pipe(select(selectors.getPaginatedWorkShifts));
  getWorkShiftsList$ = this.store.pipe(select(selectors.getWorkShiftsList));
  paginatingStatus$ = this.store.pipe(select(selectors.paginatingStatus));
  creatingStatus$ = this.store.pipe(select(selectors.creatingStatus));
  selectedWorkShift$ = this.store.pipe(select(selectors.getSelectedWorkShift));
  selectingStatus$ = this.store.pipe(select(selectors.selectingStatus));
  updatingStatus$ = this.store.pipe(select(selectors.updatingStatus));
  deletingStatus$ = this.store.pipe(select(selectors.deletingStatus));
  error$ = this.store.pipe(select(selectors.getError));

  constructor(private store: Store) {}

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
