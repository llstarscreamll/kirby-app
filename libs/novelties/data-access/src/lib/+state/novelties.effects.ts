import { map, tap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';

import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  NoveltiesActionTypes,
  GetNoveltyOk,
  GetNovelty,
  GetNoveltyError,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  UpdateNovelty,
  UpdateNoveltyOk,
  UpdateNoveltyError,
  CreateNoveltiesToEmployees,
  CreateNoveltiesToEmployeesOk,
  CreateNoveltiesToEmployeesError,
  ApproveNovelty,
  ApproveNoveltyOk,
  ApproveNoveltyError,
  DeleteNoveltyApprovalOk,
  DeleteNoveltyApprovalError,
  TrashNovelty,
  TrashNoveltyOk,
  TrashNoveltyError,
  GetReportByEmployee,
  GetReportByEmployeeOk,
  GetReportByEmployeeError,
  UpdateReportByEmployeeQuery,
  SetApprovalsByEmployeeAndDateRange,
  SetApprovalsByEmployeeAndDateRangeError,
  SetApprovalsByEmployeeAndDateRangeOk,
  DeleteApprovalsByEmployeeAndDateRange,
  DeleteApprovalsByEmployeeAndDateRangeOk,
  DeleteApprovalsByEmployeeAndDateRangeError,
  DownLoadNoveltiesReport,
  DownLoadNoveltiesReportError,
  DownLoadNoveltiesReportOk
} from './novelties.actions';
import { NoveltyService } from '../novelty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, PRIMARY_OUTLET } from '@angular/router';

@Injectable()
export class NoveltiesEffects {
  @Effect() searchNovelties$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNovelties,
    {
      run: (action: SearchNovelties, state: NoveltiesPartialState) =>
        this.noveltyService
          .search(action.payload)
          .pipe(map(apiResponse => new SearchNoveltiesOk(apiResponse))),
      onError: (action: SearchNovelties, error) =>
        new SearchNoveltiesError(error)
    }
  );

  @Effect() searchNoveltyTypes$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNoveltyTypes,
    {
      run: (action: SearchNovelties) =>
        this.noveltyService
          .searchNoveltyTypes(action.payload)
          .pipe(map(apiResponse => new SearchNoveltyTypesOk(apiResponse))),
      onError: (action: SearchNovelties, error) =>
        new SearchNoveltyTypesError(error)
    }
  );

  @Effect()
  createNoveltiesToEmployees$ = this.dataPersistence.pessimisticUpdate(
    NoveltiesActionTypes.CreateNoveltiesToEmployees,
    {
      run: (action: CreateNoveltiesToEmployees) =>
        this.noveltyService
          .createMany(action.payload)
          .pipe(
            map(apiResponse => new CreateNoveltiesToEmployeesOk(apiResponse))
          ),
      onError: (action: CreateNoveltiesToEmployees, error) =>
        new CreateNoveltiesToEmployeesError(error)
    }
  );

  @Effect() getNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.GetNovelty,
    {
      run: (action: GetNovelty) =>
        this.noveltyService
          .get(action.payload)
          .pipe(map(apiResponse => new GetNoveltyOk(apiResponse))),
      onError: (action: GetNovelty, error) => new GetNoveltyError(error)
    }
  );

  @Effect() getReportByEmployee$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.GetReportByEmployee,
    {
      run: ({ payload }: GetReportByEmployee) =>
        this.noveltyService
          .search(payload)
          .pipe(map(apiResponse => new GetReportByEmployeeOk(apiResponse))),
      onError: (_: GetReportByEmployee, error) =>
        new GetReportByEmployeeError(error)
    }
  );

  @Effect() updateReportByEmployeeQuery$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateReportByEmployeeQuery),
    tap(({ payload }: UpdateReportByEmployeeQuery) =>
      this.router.navigate([], { queryParams: payload })
    ),
    map(
      ({ payload }: UpdateReportByEmployeeQuery) =>
        new GetReportByEmployee(payload)
    )
  );

  @Effect() updateNovelty$ = this.dataPersistence.optimisticUpdate(
    NoveltiesActionTypes.UpdateNovelty,
    {
      run: (action: UpdateNovelty) =>
        this.noveltyService
          .update(action.payload.id, action.payload.noveltyData)
          .pipe(
            map(
              response =>
                new UpdateNoveltyOk({
                  id: action.payload.id,
                  noveltyData: response
                })
            )
          ),
      undoAction: (action: UpdateNovelty, error: any) =>
        new UpdateNoveltyError({ ...action.payload, error })
    }
  );

  @Effect()
  approveNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.ApproveNovelty,
    {
      run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
        return this.noveltyService
          .approve(action.payload.noveltyId)
          .pipe(map(response => new ApproveNoveltyOk(action.payload)));
      },
      onError: (action: ApproveNovelty, error) => {
        return new ApproveNoveltyError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect()
  setApprovalsByEmployeeAndDateRange$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRange,
    {
      run: ({
        payload: { employeeId, startDate, endDate }
      }: SetApprovalsByEmployeeAndDateRange) => {
        return this.noveltyService
          .setApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
          .pipe(
            map(response => new SetApprovalsByEmployeeAndDateRangeOk(response))
          );
      },
      onError: (action: SetApprovalsByEmployeeAndDateRange, error) => {
        return new SetApprovalsByEmployeeAndDateRangeError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect({ dispatch: false })
  setApprovalsByEmployeeAndDateRangeOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRangeOk),
    tap(action =>
      this.snackBar.open('Actualiza el reporte para ver los cambios', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  @Effect({ dispatch: false })
  setApprovalsByEmployeeAndDateRangeError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRangeError),
    tap(action =>
      this.snackBar.open('Ocurrió un error realizando la operación.', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  @Effect()
  trashNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.TrashNovelty,
    {
      run: (action: TrashNovelty, state: NoveltiesPartialState) => {
        return this.noveltyService.trash(action.payload).pipe(
          map(_ => new TrashNoveltyOk(action.payload)),
          tap(_ => this.router.navigate(['novelties']))
        );
      },
      onError: (action: TrashNovelty, error) => {
        return new TrashNoveltyError({
          id: action.payload,
          error: error
        });
      }
    }
  );

  @Effect()
  deleteNoveltyApproval$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.DeleteNoveltyApproval,
    {
      run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
        return this.noveltyService
          .deleteApproval(action.payload.noveltyId)
          .pipe(map(response => new DeleteNoveltyApprovalOk(action.payload)));
      },
      onError: (action: ApproveNovelty, error) => {
        return new DeleteNoveltyApprovalError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect()
  deleteApprovalsByEmployeeAndDateRange$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRange,
    {
      run: ({
        payload: { employeeId, startDate, endDate }
      }: DeleteApprovalsByEmployeeAndDateRange) => {
        return this.noveltyService
          .deleteApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
          .pipe(
            map(
              response => new DeleteApprovalsByEmployeeAndDateRangeOk(response)
            )
          );
      },
      onError: (action: DeleteApprovalsByEmployeeAndDateRange, error) => {
        return new DeleteApprovalsByEmployeeAndDateRangeError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect({ dispatch: false })
  deleteApprovalsByEmployeeAndDateRangeOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRangeOk),
    tap(action =>
      this.snackBar.open('Actualiza el reporte para ver los cambios', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  @Effect({ dispatch: false })
  deleteApprovalsByEmployeeAndDateRangeError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRangeError),
    tap(action =>
      this.snackBar.open('Ocurrió un error realizando la operación.', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  @Effect()
  downloadNoveltiesReport$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.DownLoadNoveltiesReport,
    {
      run: ({ payload }: DownLoadNoveltiesReport) => {
        return this.noveltyService
          .downloadReport(payload)
          .pipe(map(response => new DownLoadNoveltiesReportOk(response)));
      },
      onError: (action: DownLoadNoveltiesReport, error) => {
        return new DownLoadNoveltiesReportError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect({ dispatch: false }) downloadNoveltiesReportOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.DownLoadNoveltiesReportOk),
    tap(action =>
      this.snackBar.open(
        'El reporte será enviado a tu correo electrónico',
        'Ok',
        {
          duration: 5 * 1000
        }
      )
    )
  );

  @Effect({ dispatch: false })
  downloadNoveltiesReportError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.DownLoadNoveltiesReportError),
    tap(action =>
      this.snackBar.open('Ocurrió un error solicitando el reporte.', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  @Effect({ dispatch: false }) updateNoveltyOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyOk),
    tap(action =>
      this.snackBar.open('Novedad actualizada correctamente', 'Ok', {
        duration: 5 * 1000
      })
    ),
    tap(action => this.router.navigate(['/novelties']))
  );

  @Effect({ dispatch: false }) updateNoveltyError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyError),
    tap(action =>
      this.snackBar.open('Error actualizando la novedad', 'Ok', {
        duration: 5 * 1000
      })
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private noveltyService: NoveltyService,
    private dataPersistence: DataPersistence<NoveltiesPartialState>
  ) {}
}
