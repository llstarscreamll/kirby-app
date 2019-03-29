import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { AuthFacade } from '@llstarscreamll/authentication-data-access'
import { SearchWorkShifts, SearchWorkShiftsOk, SearchWorkShiftsError, WorkShiftsActionTypes } from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {
  @Effect()
  public paginateWorkShifts$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.SearchWorkShifts, {
      run: (action: SearchWorkShifts, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .search(action.payload, tokens)
            .pipe(map(response => new SearchWorkShiftsOk(response))))
        );
      },
      onError: (action: SearchWorkShifts, error) => {
        return new SearchWorkShiftsError(error);
      }
    }
    );

  public constructor(
    private authFacade: AuthFacade,
    private workShiftService: WorkShiftService,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) { }
}
