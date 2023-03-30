import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { createWorkShift } from '@kirby/work-shifts/testing';
import { INVALID_DATA_API_ERROR, emptyPagination } from '@kirby/shared';

import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsEffects } from './work-shifts.effects';
import { workShiftsActionTypes as actions } from './work-shifts.actions';

describe('WorkShiftsEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkShiftsEffects;
  let workShiftService: WorkShiftService;
  const apiError = INVALID_DATA_API_ERROR;
  const entity = createWorkShift('1');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }
        ),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        WorkShiftsEffects,
        WorkShiftService,
        provideMockActions(() => actions$),
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
        { provide: Router, useValue: { navigateByUrl: () => true } },
        { provide: MatSnackBar, useValue: { open: () => true } },
      ],
    });

    effects = TestBed.inject(WorkShiftsEffects);
    workShiftService = TestBed.inject(WorkShiftService);
  });

  describe('searchWorkShifts$', () => {
    it('ok api response should return SearchWorkShiftsOk action', () => {
      const query = { search: 'foo' };
      const data = {
        ...emptyPagination(),
        data: [createWorkShift('1'), createWorkShift('2')],
      };
      const apiResponse = cold('-a', { a: data });
      jest.spyOn(workShiftService, 'search').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.search(query) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: actions.searchOk(data) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query);
    });

    it('error api response should return SearchWorkShiftsError action', () => {
      const query = { search: 'foo' };
      const apiResponse = cold('-#', { a: {} }, apiError);
      jest.spyOn(workShiftService, 'search').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.search({ search: 'foo' }) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: actions.searchError(apiError) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query);
    });
  });

  describe('createWorkShift$', () => {
    it('ok api response should return CreateWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      jest.spyOn(workShiftService, 'create').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.create(entity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: actions.createOk(entity) }));
      expect(workShiftService.create).toHaveBeenCalledWith(entity);
    });

    it('error api response should return CreateWorkShiftError action', () => {
      const apiResponse = cold('-#', { a: {} }, apiError);
      jest.spyOn(workShiftService, 'create').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.create(entity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: actions.createError(apiError) }));
      expect(workShiftService.create).toHaveBeenCalledWith(entity);
    });
  });

  describe('getWorkShift$', () => {
    it('ok api response should return GetWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      jest.spyOn(workShiftService, 'get').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.get(entity.id) });

      expect(effects.getWorkShift$).toBeObservable(hot('--a', { a: actions.getOk(entity) }));
      expect(workShiftService.get).toHaveBeenCalledWith(entity.id);
    });

    it('error api response should return CreateWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      jest.spyOn(workShiftService, 'get').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.get(entity.id) });

      expect(effects.getWorkShift$).toBeObservable(hot('--a', { a: actions.getError(apiError) }));
      expect(workShiftService.get).toHaveBeenCalledWith(entity.id);
    });
  });

  describe('updateWorkShift$', () => {
    it('ok api response should return UpdateWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      jest.spyOn(workShiftService, 'update').mockReturnValue(apiResponse);

      actions$ = hot('-a', {
        a: actions.update({ id: entity.id, data: entity }),
      });

      expect(effects.updateWorkShift$).toBeObservable(hot('--a', { a: actions.updateOk(entity) }));
      expect(workShiftService.update).toHaveBeenCalledWith(entity.id, entity);
    });

    it('error api response should return UpdateWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      jest.spyOn(workShiftService, 'update').mockReturnValue(apiResponse);

      actions$ = hot('-a', {
        a: actions.update({ id: entity.id, data: entity }),
      });

      expect(effects.updateWorkShift$).toBeObservable(hot('--a', { a: actions.updateError(apiError) }));
      expect(workShiftService.update).toHaveBeenCalledWith(entity.id, entity);
    });
  });

  describe('deleteWorkShift$', () => {
    it('ok api response should return DeleteWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      jest.spyOn(workShiftService, 'delete').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.delete(entity.id) });

      expect(effects.deleteWorkShift$).toBeObservable(hot('--a', { a: actions.deleteOk(entity.id) }));
      expect(workShiftService.delete).toHaveBeenCalledWith(entity.id);
    });

    it('error api response should return DeleteWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      jest.spyOn(workShiftService, 'delete').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: actions.delete(entity.id) });

      expect(effects.deleteWorkShift$).toBeObservable(hot('--a', { a: actions.deleteError(apiError) }));
      expect(workShiftService.delete).toHaveBeenCalledWith(entity.id);
    });
  });
});
