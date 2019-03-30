import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { readFirst, cold, getTestScheduler, hot } from '@nrwl/nx/testing';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { createWorkShifts } from '../mocks';
import { WorkShiftsFacade } from './work-shifts.facade';
import { SearchWorkShiftsOk, GetWorkShift, UpdateWorkShift, DeleteWorkShift, CreateWorkShift, SearchWorkShifts } from './work-shifts.actions';
import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsEffects } from './work-shifts.effects';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { AUTH_TOKENS_MOCK } from '@llstarscreamll/authentication/utils';
import { WorkShiftsState, initialState, workShiftsReducer, WORK_SHIFTS_FEATURE_KEY, LoadStatuses } from './work-shifts.reducer';

interface TestSchema {
  workShifts: WorkShiftsState;
}

/**
 * @todo: remove redundant tests, some test belongs to the effects class, some to the reducer function
*/
describe('WorkShiftsFacade', () => {
  let facade: WorkShiftsFacade;
  let workShiftService: WorkShiftService;
  let store: Store<TestSchema>;
  let authTokens = AUTH_TOKENS_MOCK;
  let pagination = {
    data: [
      createWorkShifts('1'),
      createWorkShifts('2')
    ],
    meta: {}
  };

  beforeEach(() => {

  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WORK_SHIFTS_FEATURE_KEY, workShiftsReducer, { initialState }),
          EffectsModule.forFeature([WorkShiftsEffects])
        ],
        providers: [WorkShiftsFacade, WorkShiftService]
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientTestingModule,
        ],
        providers: [
          { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
          { provide: AuthFacade, useValue: { authTokens$: cold('a', { a: authTokens }) } }
        ]
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(WorkShiftsFacade);
      workShiftService = TestBed.get(WorkShiftService);

      spyOn(store, 'dispatch').and.callThrough();
    });

    it('search() should return paginated list with status == loaded when service response is ok', async done => {
      spyOn(workShiftService, 'search').and.returnValue(cold('-a|', { a: pagination }));

      try {
        let query = {};
        let paginatedList = await readFirst(facade.paginatedWorkShifts$);
        let status = await readFirst(facade.paginatingStatus$);

        expect(paginatedList.data.length).toBe(0);
        expect(status).toBe(LoadStatuses.Empty);

        await facade.search(query);
        getTestScheduler().flush();

        paginatedList = await readFirst(facade.paginatedWorkShifts$);
        status = await readFirst(facade.paginatingStatus$);

        expect(paginatedList.data.length).toBe(pagination.data.length);
        expect(status).toBe(LoadStatuses.Completed);
        expect(store.dispatch).toHaveBeenCalledWith(new SearchWorkShifts(query));
        expect(workShiftService.search).toHaveBeenCalledWith(query, authTokens);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('create() should call service.create and set creatingStatus to completed when service response is ok', async done => {
      const newEntity = createWorkShifts('1');
      spyOn(workShiftService, 'create').and.returnValue(cold('-a|', { a: newEntity }));

      try {
        let isLoaded = await readFirst(facade.creatingStatus$);

        expect(isLoaded).toBe(undefined);

        await facade.create(newEntity);
        getTestScheduler().flush();

        isLoaded = await readFirst(facade.creatingStatus$);

        expect(isLoaded).toBe(LoadStatuses.Completed);
        expect(store.dispatch).toHaveBeenCalledWith(new CreateWorkShift(newEntity));
        expect(workShiftService.create).toHaveBeenCalledWith(newEntity, authTokens);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('get() should call service.get and set selectingStatus to completed when service response is ok', async done => {
      const entity = createWorkShifts('1');
      spyOn(workShiftService, 'get').and.returnValue(cold('-a|', { a: entity }));

      try {
        let status = await readFirst(facade.selectingStatus$);
        let selected = await readFirst(facade.selectedWorkShift$);

        expect(status).toBe(undefined);

        await facade.get(entity.id);
        getTestScheduler().flush();

        status = await readFirst(facade.selectingStatus$);
        selected = await readFirst(facade.selectedWorkShift$);

        expect(status).toBe(LoadStatuses.Completed);
        expect(selected).toBe(entity);
        expect(store.dispatch).toHaveBeenCalledWith(new GetWorkShift(entity.id));
        expect(workShiftService.get).toHaveBeenCalledWith(entity.id, authTokens);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('update() should call service.update and set updatingStatus to completed when service response is ok', async done => {
      const updatedEntity = createWorkShifts('1');
      spyOn(workShiftService, 'update').and.returnValue(cold('-a|', { a: updatedEntity }));

      try {
        let status = await readFirst(facade.updatingStatus$);
        let selected = await readFirst(facade.selectedWorkShift$);

        expect(status).toBe(undefined);

        await facade.update(updatedEntity.id, updatedEntity);
        getTestScheduler().flush();

        status = await readFirst(facade.updatingStatus$);
        selected = await readFirst(facade.selectedWorkShift$);

        expect(status).toBe(LoadStatuses.Completed);
        expect(selected).toBe(updatedEntity);
        expect(store.dispatch).toHaveBeenCalledWith(new UpdateWorkShift({ id: updatedEntity.id, data: updatedEntity }));
        expect(workShiftService.update).toHaveBeenCalledWith(updatedEntity.id, updatedEntity, authTokens);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('delete() should call service.delete and set deletingStatus to completed when service response is ok', async done => {
      spyOn(workShiftService, 'delete').and.returnValue(cold('-a|', { a: 'ok' }));

      try {
        let id = 'AAA';
        let status = await readFirst(facade.deletingStatus$);

        expect(status).toBe(undefined);

        await facade.delete(id);
        getTestScheduler().flush();

        status = await readFirst(facade.deletingStatus$);

        expect(status).toBe(LoadStatuses.Completed);
        expect(store.dispatch).toHaveBeenCalledWith(new DeleteWorkShift(id));
        expect(workShiftService.delete).toHaveBeenCalledWith(id, authTokens);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

  });
});
