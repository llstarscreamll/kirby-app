import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { optimisticUpdate, pessimisticUpdate, fetch } from '@nrwl/angular';

import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  NoveltiesActionTypes as a,
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
  SetApprovalsByEmployeeAndDateRange,
  SetApprovalsByEmployeeAndDateRangeError,
  SetApprovalsByEmployeeAndDateRangeOk,
  DeleteApprovalsByEmployeeAndDateRange,
  DeleteApprovalsByEmployeeAndDateRangeOk,
  DeleteApprovalsByEmployeeAndDateRangeError,
  DownLoadNoveltiesReport,
  DownLoadNoveltiesReportError,
  DownLoadNoveltiesReportOk,
  SearchNoveltyTypes,
  GetResume,
  GetResumeError,
  GetResumeOk,
  CreateBalanceNovelty,
  CreateBalanceNoveltyError,
  CreateBalanceNoveltyOk,
  ExportResume,
  ExportResumeError,
  ExportResumeOk,
} from './novelties.actions';
import { NoveltyService } from '../novelty.service';

@Injectable()
export class NoveltiesEffects {
  searchNovelties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.SearchNovelties),
      fetch({
        run: (action: SearchNovelties, state: NoveltiesPartialState) =>
          this.noveltyService.search(action.payload).pipe(map((apiResponse) => new SearchNoveltiesOk(apiResponse))),
        onError: (action: SearchNovelties, error) => new SearchNoveltiesError(error),
      })
    )
  );

  searchNoveltyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.SearchNoveltyTypes),
      fetch({
        run: (action: SearchNoveltyTypes) =>
          this.noveltyService
            .searchNoveltyTypes(action.payload)
            .pipe(map((apiResponse) => new SearchNoveltyTypesOk(apiResponse))),
        onError: (action: SearchNoveltyTypes, error) => new SearchNoveltyTypesError(error),
      })
    )
  );

  getResume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.GetResume),
      fetch({
        run: (action: GetResume) =>
          this.noveltyService.getResume(action.payload).pipe(map((apiResponse) => new GetResumeOk(apiResponse))),
        onError: (action: GetResume, error) => new GetResumeError(error),
      })
    )
  );

  exportResume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.ExportResume),
      fetch({
        run: (action: ExportResume) =>
          this.noveltyService.exportResume(action.payload).pipe(map((apiResponse) => new ExportResumeOk(apiResponse))),
        onError: (action: ExportResume, error) => new ExportResumeError(error),
      })
    )
  );

  exportResumeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.ExportResumeOk),
        tap((_) =>
          this.snackBar.open('El reporte será enviado a tu correo electrónico', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  createNoveltiesToEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.CreateNoveltiesToEmployees),
      pessimisticUpdate({
        run: (action: CreateNoveltiesToEmployees) =>
          this.noveltyService
            .createMany(action.payload)
            .pipe(map((apiResponse) => new CreateNoveltiesToEmployeesOk(apiResponse))),
        onError: (action: CreateNoveltiesToEmployees, error) => new CreateNoveltiesToEmployeesError(error),
      })
    )
  );

  createBalanceNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.CreateBalanceNovelty),
      pessimisticUpdate({
        run: (action: CreateBalanceNovelty) =>
          this.noveltyService
            .createBalance(action.payload)
            .pipe(map((apiResponse) => new CreateBalanceNoveltyOk(apiResponse))),
        onError: (action: CreateBalanceNovelty, error) => new CreateBalanceNoveltyError(error),
      })
    )
  );

  createBalanceNoveltyOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.CreateBalanceNoveltyOk),
        tap((action) =>
          this.snackBar.open('Balance de novedades creado correctamente', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  getNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.GetNovelty),
      fetch({
        run: (action: GetNovelty) =>
          this.noveltyService.get(action.payload).pipe(map((apiResponse) => new GetNoveltyOk(apiResponse))),
        onError: (action: GetNovelty, error) => new GetNoveltyError(error),
      })
    )
  );

  updateNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.UpdateNovelty),
      optimisticUpdate({
        run: (action: UpdateNovelty) =>
          this.noveltyService.update(action.payload.id, action.payload.noveltyData).pipe(
            map(
              (response) =>
                new UpdateNoveltyOk({
                  id: action.payload.id,
                  noveltyData: response,
                })
            )
          ),
        undoAction: (action: UpdateNovelty, error: any) => new UpdateNoveltyError({ ...action.payload, error }),
      })
    )
  );

  approveNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.ApproveNovelty),
      fetch({
        run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
          return this.noveltyService
            .approve(action.payload.noveltyId)
            .pipe(map((response) => new ApproveNoveltyOk(action.payload)));
        },
        onError: (action: ApproveNovelty, error) => {
          return new ApproveNoveltyError({
            ...action.payload,
            error: error,
          });
        },
      })
    )
  );

  setApprovalsByEmployeeAndDateRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.SetApprovalsByEmployeeAndDateRange),
      fetch({
        run: ({ payload: { employeeId, startDate, endDate } }: SetApprovalsByEmployeeAndDateRange) => {
          return this.noveltyService
            .setApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
            .pipe(map((response) => new SetApprovalsByEmployeeAndDateRangeOk(response)));
        },
        onError: (action: SetApprovalsByEmployeeAndDateRange, error) => {
          return new SetApprovalsByEmployeeAndDateRangeError({
            ...action.payload,
            error: error,
          });
        },
      })
    )
  );

  setApprovalsByEmployeeAndDateRangeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.SetApprovalsByEmployeeAndDateRangeOk),
        tap((action) =>
          this.snackBar.open('Actualiza el reporte para ver los cambios', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  setApprovalsByEmployeeAndDateRangeError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.SetApprovalsByEmployeeAndDateRangeError),
        tap((action) =>
          this.snackBar.open('Ocurrió un error realizando la operación.', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  trashNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.TrashNovelty),
      fetch({
        run: (action: TrashNovelty, state: NoveltiesPartialState) => {
          return this.noveltyService.trash(action.payload).pipe(
            map((_) => new TrashNoveltyOk(action.payload)),
            tap((_) => this.router.navigate(['novelties']))
          );
        },
        onError: (action: TrashNovelty, error) => {
          return new TrashNoveltyError({
            id: action.payload,
            error: error,
          });
        },
      })
    )
  );

  deleteNoveltyApproval$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.DeleteNoveltyApproval),
      fetch({
        run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
          return this.noveltyService
            .deleteApproval(action.payload.noveltyId)
            .pipe(map((response) => new DeleteNoveltyApprovalOk(action.payload)));
        },
        onError: (action: ApproveNovelty, error) => {
          return new DeleteNoveltyApprovalError({
            ...action.payload,
            error: error,
          });
        },
      })
    )
  );

  deleteApprovalsByEmployeeAndDateRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.DeleteApprovalsByEmployeeAndDateRange),
      fetch({
        run: ({ payload: { employeeId, startDate, endDate } }: DeleteApprovalsByEmployeeAndDateRange) => {
          return this.noveltyService
            .deleteApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
            .pipe(map((response) => new DeleteApprovalsByEmployeeAndDateRangeOk(response)));
        },
        onError: (action: DeleteApprovalsByEmployeeAndDateRange, error) => {
          return new DeleteApprovalsByEmployeeAndDateRangeError({
            ...action.payload,
            error: error,
          });
        },
      })
    )
  );

  deleteApprovalsByEmployeeAndDateRangeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DeleteApprovalsByEmployeeAndDateRangeOk),
        tap((action) =>
          this.snackBar.open('Actualiza el reporte para ver los cambios', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  deleteApprovalsByEmployeeAndDateRangeError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DeleteApprovalsByEmployeeAndDateRangeError),
        tap((action) =>
          this.snackBar.open('Ocurrió un error realizando la operación.', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  downloadNoveltiesReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.DownLoadNoveltiesReport),
      fetch({
        run: ({ payload }: DownLoadNoveltiesReport) => {
          return this.noveltyService
            .downloadReport(payload)
            .pipe(map((response) => new DownLoadNoveltiesReportOk(response)));
        },
        onError: (action: DownLoadNoveltiesReport, error) => {
          return new DownLoadNoveltiesReportError({
            ...action.payload,
            error: error,
          });
        },
      })
    )
  );

  downloadNoveltiesReportOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DownLoadNoveltiesReportOk),
        tap((action) =>
          this.snackBar.open('El reporte será enviado a tu correo electrónico', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  downloadNoveltiesReportError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DownLoadNoveltiesReportError),
        tap((action) =>
          this.snackBar.open('Ocurrió un error solicitando el reporte.', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  updateNoveltyOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.UpdateNoveltyOk),
        tap((action) =>
          this.snackBar.open('Novedad actualizada correctamente', 'Ok', {
            duration: 5 * 1000,
          })
        ),
        tap((action) => this.router.navigate(['/novelties']))
      ),
    { dispatch: false }
  );

  updateNoveltyError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.UpdateNoveltyError),
        tap((action) =>
          this.snackBar.open('Error actualizando la novedad', 'Ok', {
            duration: 5 * 1000,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private noveltyService: NoveltyService
  ) {}
}
