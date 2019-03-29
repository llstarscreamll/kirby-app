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
import { SearchWorkShifts, SearchWorkShiftsOk } from './work-shifts.actions';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';

describe('WorkShiftsEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkShiftsEffects;
  let workShiftService: WorkShiftService;

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

  describe('paginateWorkShifts$', () => {

    it('should return ', () => {
      const data = { data: [createWorkShifts('1'), createWorkShifts('2')], meta: {} };
      const apiResponse = cold('-a', { a: data });
      spyOn(workShiftService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchWorkShifts({ search: 'foo' }) });

      expect(effects.paginateWorkShifts$).toBeObservable(hot('--a', { a: new SearchWorkShiftsOk(data) }));
      expect(workShiftService.search).toHaveBeenCalled();
    });

  });
});
