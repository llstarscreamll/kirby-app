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
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';
import { INVALID_DATA_API_ERROR } from '@llstarscreamll/shared';
import { SearchWorkShifts, SearchWorkShiftsOk, SearchWorkShiftsError, CreateWorkShift, CreateWorkShiftOk, CreateWorkShiftError, GetWorkShiftOk, GetWorkShift, GetWorkShiftError, UpdateWorkShiftOk, UpdateWorkShift, UpdateWorkShiftError, DeleteWorkShift, DeleteWorkShiftOk, DeleteWorkShiftError } from './work-shifts.actions';

describe('WorkShiftsEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkShiftsEffects;
  let workShiftService: WorkShiftService;
  let apiError = INVALID_DATA_API_ERROR;
  let authTokens = AUTH_TOKENS_MOCK;
  const entity = createWorkShifts('1');

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
      ]
    });

    effects = TestBed.get(WorkShiftsEffects);
    workShiftService = TestBed.get(WorkShiftService);
  });

  describe('searchWorkShifts$', () => {

    it('ok api response should return SearchWorkShiftsOk action', () => {
      const query = { search: 'foo' };
      const data = { data: [createWorkShifts('1'), createWorkShifts('2')], meta: {} };
      const apiResponse = cold('-a', { a: data });
      spyOn(workShiftService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchWorkShifts(query) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: new SearchWorkShiftsOk(data) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query);
    });

    it('error api response should return SearchWorkShiftsError action', () => {
      const query = { search: 'foo' };
      const apiResponse = cold('-#', { a: {} }, apiError);
      spyOn(workShiftService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchWorkShifts({ search: 'foo' }) });

      expect(effects.searchWorkShifts$).toBeObservable(hot('--a', { a: new SearchWorkShiftsError(apiError) }));
      expect(workShiftService.search).toHaveBeenCalledWith(query);
    });

  });

  describe('createWorkShift$', () => {

    it('ok api response should return CreateWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      spyOn(workShiftService, 'create').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new CreateWorkShift(entity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: new CreateWorkShiftOk(entity) }));
      expect(workShiftService.create).toHaveBeenCalledWith(entity);
    });

    it('error api response should return CreateWorkShiftError action', () => {
      const apiResponse = cold('-#', { a: {} }, apiError);
      spyOn(workShiftService, 'create').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new CreateWorkShift(entity) });

      expect(effects.createWorkShift$).toBeObservable(hot('--a', { a: new CreateWorkShiftError(apiError) }));
      expect(workShiftService.create).toHaveBeenCalledWith(entity);
    });

  });

  describe('getWorkShift$', () => {

    it('ok api response should return GetWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      spyOn(workShiftService, 'get').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new GetWorkShift(entity.id) });

      expect(effects.getWorkShift$).toBeObservable(hot('--a', { a: new GetWorkShiftOk(entity) }));
      expect(workShiftService.get).toHaveBeenCalledWith(entity.id);
    });

    it('error api response should return CreateWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      spyOn(workShiftService, 'get').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new GetWorkShift(entity.id) });

      expect(effects.getWorkShift$).toBeObservable(hot('--a', { a: new GetWorkShiftError(apiError) }));
      expect(workShiftService.get).toHaveBeenCalledWith(entity.id);
    });

  });

  describe('updateWorkShift$', () => {

    it('ok api response should return UpdateWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      spyOn(workShiftService, 'update').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new UpdateWorkShift({ id: entity.id, data: entity }) });

      expect(effects.updateWorkShift$).toBeObservable(hot('--a', { a: new UpdateWorkShiftOk(entity) }));
      expect(workShiftService.update).toHaveBeenCalledWith(entity.id, entity);
    });

    it('error api response should return UpdateWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      spyOn(workShiftService, 'update').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new UpdateWorkShift({ id: entity.id, data: entity }) });

      expect(effects.updateWorkShift$).toBeObservable(hot('--a', { a: new UpdateWorkShiftError(apiError) }));
      expect(workShiftService.update).toHaveBeenCalledWith(entity.id, entity);
    });

  });

  describe('deleteWorkShift$', () => {

    it('ok api response should return DeleteWorkShiftOk action', () => {
      const apiResponse = cold('-a', { a: entity });
      spyOn(workShiftService, 'delete').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new DeleteWorkShift(entity.id) });

      expect(effects.deleteWorkShift$).toBeObservable(hot('--a', { a: new DeleteWorkShiftOk(entity.id) }));
      expect(workShiftService.delete).toHaveBeenCalledWith(entity.id);
    });

    it('error api response should return DeleteWorkShiftError action', () => {
      const apiResponse = cold('-#', {}, apiError);
      spyOn(workShiftService, 'delete').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new DeleteWorkShift(entity.id) });

      expect(effects.deleteWorkShift$).toBeObservable(hot('--a', { a: new DeleteWorkShiftError(apiError) }));
      expect(workShiftService.delete).toHaveBeenCalledWith(entity.id);
    });

  });

});
