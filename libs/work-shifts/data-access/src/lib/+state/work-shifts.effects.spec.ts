import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot, cold } from '@nrwl/nx/testing';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { createWorkShifts } from '../mocks';
import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsEffects } from './work-shifts.effects';
import { SearchWorkShifts, SearchWorkShiftsOk, SearchWorkShiftsError, CreateWorkShift, CreateWorkShiftOk, CreateWorkShiftError } from './work-shifts.actions';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';
import { INVALID_DATA_API_ERROR } from '@llstarscreamll/shared';

describe('WorkShiftsEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkShiftsEffects;
  let workShiftService: WorkShiftService;
  let apiError = INVALID_DATA_API_ERROR;
  let authTokens = AUTH_TOKENS_MOCK;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        WorkShiftsEffects,
        DataPersistence,
        WorkShiftService,
        provideMockActions(() => actions$),
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
        { provide: AuthFacade, useValue: { authTokens$: cold('a', { a: AUTH_TOKENS_MOCK }) } }
      ]
    });

    effects = TestBed.get(WorkShiftsEffects);
    workShiftService = TestBed.get(WorkShiftService);
  });

  describe('searchWorkShifts$', () => {

    it('should return SearchWorkShiftsOk action when service response is ok', () => {
      const query = { search: 'foo' };
      const data = { data: [createWorkShifts('1'), createWorkShifts('2')], meta: {} };
      const apiResponse = cold('-a', { a: data });
      spyOn(workShiftService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchWorkShifts(query) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: new SearchWorkShiftsOk(data) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query, authTokens);
    });

    it('should return SearchWorkShiftsError action when service response is error', () => {
      const query = { search: 'foo' };
      const apiResponse = cold('-#', { a: {} }, apiError);
      spyOn(workShiftService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchWorkShifts({ search: 'foo' }) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: new SearchWorkShiftsError(apiError) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query, authTokens);
    });

  });

  describe('createWorkShift$', () => {

    it('should return CreateWorkShiftOk action when service response is ok', () => {
      const newEntity = createWorkShifts('1');
      const apiResponse = cold('-a', { a: newEntity });
      spyOn(workShiftService, 'create').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new CreateWorkShift(newEntity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: new CreateWorkShiftOk(newEntity) }));
      expect(workShiftService.create).toHaveBeenCalledWith(newEntity, authTokens);
    });

    it('should return CreateWorkShiftError action when service response is error', () => {
      const newEntity = createWorkShifts('1');
      const apiResponse = cold('-#', { a: {} }, apiError);
      spyOn(workShiftService, 'create').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new CreateWorkShift(newEntity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: new CreateWorkShiftError(apiError) }));
      expect(workShiftService.create).toHaveBeenCalledWith(newEntity, authTokens);
    });

  });
});
