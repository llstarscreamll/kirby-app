import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { workShiftsQuery } from './work-shifts.selectors';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { SearchWorkShifts, CreateWorkShift, UpdateWorkShift, DeleteWorkShift, GetWorkShift } from './work-shifts.actions';

@Injectable()
export class WorkShiftsFacade {

  public paginatedWorkShifts$ = this.store.pipe(select(workShiftsQuery.getPaginatedWorkShifts));
  public paginatingStatus$ = this.store.pipe(select(workShiftsQuery.paginatingStatus));
  public creatingStatus$ = this.store.pipe(select(workShiftsQuery.creatingStatus));
  public selectedWorkShift$ = this.store.pipe(select(workShiftsQuery.getSelectedWorkShift));
  public selectingStatus$ = this.store.pipe(select(workShiftsQuery.selectingStatus));
  public updatingStatus$ = this.store.pipe(select(workShiftsQuery.updatingStatus));
  public deletingStatus$ = this.store.pipe(select(workShiftsQuery.deletingStatus));

  public constructor(private store: Store<WorkShiftsPartialState>) { }

  public search(query: any = {}) {
    this.store.dispatch(new SearchWorkShifts(query));
  }

  public create(workShift: WorkShiftInterface) {
    this.store.dispatch(new CreateWorkShift(workShift));
  }

  public get(id: string) {
    this.store.dispatch(new GetWorkShift(id));
  }

  public update(id: string, workShift: WorkShiftInterface) {
    this.store.dispatch(new UpdateWorkShift({ id, data: workShift }));
  }

  public delete(id: string) {
    this.store.dispatch(new DeleteWorkShift(id));
  }

}
