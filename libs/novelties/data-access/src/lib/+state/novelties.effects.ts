import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { optimisticUpdate, pessimisticUpdate, fetch } from '@nrwl/angular';

import * as a from './novelties.actions';
import { NoveltyService } from '../novelty.service';
import { NoveltiesPartialState } from './novelties.reducer';

@Injectable()
export class NoveltiesEffects {
  searchNovelties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.Search),
      fetch({
        run: (action: ReturnType<typeof a.Search>, state: NoveltiesPartialState) =>
          this.noveltyService.search(action.payload).pipe(map((apiResponse) => a.SearchOk(apiResponse))),
        onError: (action: ReturnType<typeof a.Search>, error) => a.SearchError(error),
      })
    )
  );

  searchNoveltyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.SearchNoveltyTypes),
      fetch({
        run: (action: ReturnType<typeof a.SearchNoveltyTypes>) =>
          this.noveltyService
            .searchNoveltyTypes(action.payload)
            .pipe(map((apiResponse) => a.SearchNoveltyTypesOk(apiResponse))),
        onError: (action: ReturnType<typeof a.SearchNoveltyTypes>, error) => a.SearchNoveltyTypesError(error),
      })
    )
  );

  getResume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.GetResume),
      fetch({
        run: (action: ReturnType<typeof a.GetResume>) =>
          this.noveltyService.getResume(action.payload).pipe(map((apiResponse) => a.GetResumeOk(apiResponse))),
        onError: (action: ReturnType<typeof a.GetResume>, error) => a.GetResumeError(error),
      })
    )
  );

  exportResume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.ExportResume),
      fetch({
        run: (action: ReturnType<typeof a.ExportResume>) =>
          this.noveltyService.exportResume(action.payload).pipe(map((apiResponse) => a.ExportResumeOk(apiResponse))),
        onError: (action: ReturnType<typeof a.ExportResume>, error) => a.ExportResumeError(error),
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
      ofType(a.Create),
      pessimisticUpdate({
        run: (action: ReturnType<typeof a.Create>) =>
          this.noveltyService
            .createMany(action.payload)
            .pipe(map((apiResponse) => a.CreateOk(apiResponse))),
        onError: (action: ReturnType<typeof a.Create>, error) =>
          a.CreateError(error),
      })
    )
  );

  createBalanceNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.CreateBalance),
      pessimisticUpdate({
        run: (action: ReturnType<typeof a.CreateBalance>) =>
          this.noveltyService
            .createBalance(action.payload)
            .pipe(map((apiResponse) => a.CreateBalanceOk(apiResponse))),
        onError: (action: ReturnType<typeof a.CreateBalance>, error) => a.CreateBalanceError(error),
      })
    )
  );

  createBalanceNoveltyOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.CreateBalanceOk),
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
      ofType(a.Get),
      fetch({
        run: (action: ReturnType<typeof a.Get>) =>
          this.noveltyService.get(action.payload).pipe(map((apiResponse) => a.GetOk(apiResponse))),
        onError: (action: ReturnType<typeof a.Get>, error) => a.GetError(error),
      })
    )
  );

  updateNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.Edit),
      optimisticUpdate({
        run: (action: ReturnType<typeof a.Edit>) =>
          this.noveltyService.update(action.payload.id, action.payload.noveltyData).pipe(
            map((response) =>
              a.EditOk({
                payload: {
                  id: action.payload.id,
                  noveltyData: response,
                },
              })
            )
          ),
        undoAction: (action: ReturnType<typeof a.Edit>, error: any) =>
          a.EditError({ payload: { ...action.payload, error } }),
      })
    )
  );

  approveNovelty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.Approve),
      fetch({
        run: (action: ReturnType<typeof a.Approve>, state: NoveltiesPartialState) => {
          return this.noveltyService
            .approve(action.payload.noveltyId)
            .pipe(map((response) => a.ApproveOk({ payload: action.payload })));
        },
        onError: (action: ReturnType<typeof a.Approve>, error) => {
          return a.ApproveError({
            payload: {
              ...action.payload,
              error: error,
            },
          });
        },
      })
    )
  );

  setApprovalsByEmployeeAndDateRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.SetApprovals),
      fetch({
        run: ({
          payload: { employeeId, startDate, endDate },
        }: ReturnType<typeof a.SetApprovals>) => {
          return this.noveltyService
            .setApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
            .pipe(map((response) => a.SetApprovalsOk({ payload: response })));
        },
        onError: (action: ReturnType<typeof a.SetApprovals>, error) => {
          return a.SetApprovalsError({
            payload: {
              ...action.payload,
              error: error,
            },
          });
        },
      })
    )
  );

  setApprovalsByEmployeeAndDateRangeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.SetApprovalsOk),
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
        ofType(a.SetApprovalsError),
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
      ofType(a.Trash),
      fetch({
        run: (action: ReturnType<typeof a.Trash>, state: NoveltiesPartialState) => {
          return this.noveltyService.trash(action.payload).pipe(
            map((_) => a.TrashOk({ payload: action.payload })),
            tap((_) => this.router.navigate(['novelties']))
          );
        },
        onError: (action: ReturnType<typeof a.Trash>, error) =>
          a.TrashError({ payload: { id: action.payload, error: error } }),
      })
    )
  );

  deleteNoveltyApproval$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.DeleteApproval),
      fetch({
        run: (action: ReturnType<typeof a.DeleteApproval>) =>
          this.noveltyService
            .deleteApproval(action.payload.noveltyId)
            .pipe(map((_) => a.DeleteApprovalOk({ payload: action.payload }))),
        onError: (action: ReturnType<typeof a.DeleteApproval>, error) =>
          a.DeleteApprovalError({
            payload: {
              ...action.payload,
              error: error,
            },
          }),
      })
    )
  );

  deleteApprovalsByEmployeeAndDateRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(a.DeleteApprovals),
      fetch({
        run: ({
          payload: { employeeId, startDate, endDate },
        }: ReturnType<typeof a.DeleteApprovals>) => {
          return this.noveltyService
            .deleteApprovalsByEmployeeAndDateRange(employeeId, startDate, endDate)
            .pipe(map((response) => a.DeleteApprovalsOk(response)));
        },
        onError: (action: ReturnType<typeof a.DeleteApprovals>, error) => {
          return a.DeleteApprovalsError({
            payload: {
              ...action.payload,
              error: error,
            },
          });
        },
      })
    )
  );

  deleteApprovalsByEmployeeAndDateRangeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DeleteApprovalsOk),
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
        ofType(a.DeleteApprovalsError),
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
      ofType(a.DownLoadReport),
      fetch({
        run: ({ payload }: ReturnType<typeof a.DownLoadReport>) => {
          return this.noveltyService
            .downloadReport(payload)
            .pipe(map((response) => a.DownLoadReportOk(response)));
        },
        onError: (action: ReturnType<typeof a.DownLoadReport>, error) => {
          return a.DownLoadReportError({
            payload: {
              ...action.payload,
              error: error,
            },
          });
        },
      })
    )
  );

  downloadNoveltiesReportOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(a.DownLoadReportOk),
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
        ofType(a.DownLoadReportError),
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
        ofType(a.EditOk),
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
        ofType(a.EditError),
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
