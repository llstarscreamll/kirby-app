import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WorkShiftsFacade } from './work-shifts.facade';
import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsEffects } from './work-shifts.effects';
import { createWorkShift } from '@kirby/work-shifts/testing';
import { AuthFacade } from '@kirby/authentication/data-access';
import { AUTH_TOKENS_MOCK } from '@kirby/authentication/utils';
import { workShiftsActionTypes as actions } from './work-shifts.actions';
import { WorkShiftsState, initialState, workShiftsReducer, WORK_SHIFTS_FEATURE_KEY } from './work-shifts.reducer';

interface TestSchema {
  workShifts: WorkShiftsState;
}

/**
 * @todo: remove redundant tests, some test belongs to the effects class, some to the reducer function
 */
describe('WorkShiftsFacade', () => {
  let facade: WorkShiftsFacade;
  let store: Store<TestSchema>;
  const authTokens = AUTH_TOKENS_MOCK;
  const entity = createWorkShift('1');

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WORK_SHIFTS_FEATURE_KEY, workShiftsReducer, {
            initialState,
          }),
          EffectsModule.forFeature([WorkShiftsEffects]),
        ],
        providers: [
          WorkShiftsFacade,
          WorkShiftService,
          { provide: Router, useValue: { navigateByUrl: () => true } },
          { provide: MatSnackBar, useValue: { open: () => true } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
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
          CustomFeatureModule,
          HttpClientTestingModule,
        ],
        providers: [
          { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
          {
            provide: AuthFacade,
            useValue: { authTokens$: cold('a', { a: authTokens }) },
          },
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WorkShiftsFacade);

      jest.spyOn(store, 'dispatch');
    });

    it('search() should call SearchWorkShifts action', async () => {
      const query = {};
      await facade.search(query);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(actions.search(query));
    });

    it('create() should call CreateWorkShift action', async () => {
      await facade.create(entity);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(actions.create(entity));
    });

    it('get() should call GetWorkShift action', async () => {
      await facade.get(entity.id);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(actions.get(entity.id));
    });

    it('update() should call UpdateWorkShift action', async () => {
      await facade.update(entity.id, entity);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(
        actions.update({
          id: entity.id,
          data: entity,
        })
      );
    });

    it('delete() should call DeleteWorkShift action', async () => {
      const id = 'AAA';
      await facade.delete(id);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(actions.delete(id));
    });
  });
});
