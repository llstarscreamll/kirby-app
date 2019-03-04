import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { WorkShiftsEffects } from './work-shifts.effects';
import { WorkShiftsFacade } from './work-shifts.facade';

import { workShiftsQuery } from './work-shifts.selectors';
import { LoadWorkShifts, WorkShiftsLoaded } from './work-shifts.actions';
import {
  WorkShiftsState,
  Entity,
  initialState,
  workShiftsReducer
} from './work-shifts.reducer';

interface TestSchema {
  workShifts: WorkShiftsState;
}

describe('WorkShiftsFacade', () => {
  let facade: WorkShiftsFacade;
  let store: Store<TestSchema>;
  let createWorkShifts;

  beforeEach(() => {
    createWorkShifts = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('workShifts', workShiftsReducer, {
            initialState
          }),
          EffectsModule.forFeature([WorkShiftsEffects])
        ],
        providers: [WorkShiftsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(WorkShiftsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allWorkShifts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allWorkShifts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `WorkShiftsLoaded` to manually submit list for state management
     */
    it('allWorkShifts$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allWorkShifts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new WorkShiftsLoaded([
            createWorkShifts('AAA'),
            createWorkShifts('BBB')
          ])
        );

        list = await readFirst(facade.allWorkShifts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
