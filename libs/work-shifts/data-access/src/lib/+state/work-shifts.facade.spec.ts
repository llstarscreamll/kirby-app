import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { readFirst } from '@nrwl/nx/testing';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { createWorkShifts } from '../mocks';
import { WorkShiftsFacade } from './work-shifts.facade';
import { WorkShiftsLoaded } from './work-shifts.actions';
import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsEffects } from './work-shifts.effects';
import { WorkShiftsState, initialState, workShiftsReducer, WORK_SHIFTS_FEATURE_KEY } from './work-shifts.reducer';

interface TestSchema {
  workShifts: WorkShiftsState;
}

describe('WorkShiftsFacade', () => {
  let facade: WorkShiftsFacade;
  let workShiftService: WorkShiftService;
  let store: Store<TestSchema>;

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
          { provide: 'environment', useValue: { api: 'https://my.api.com/' } }
        ]
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(WorkShiftsFacade);
      workShiftService = TestBed.get(WorkShiftService);
    });

    /**
     * The initially generated facade::paginate() returns empty array
     */
    it('paginate() should return empty list with loaded == true', async done => {
      try {
        let paginatedList = await readFirst(facade.paginatedWorkShifts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(paginatedList.data.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.paginate();

        paginatedList = await readFirst(facade.paginatedWorkShifts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(paginatedList.data.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `WorkShiftsLoaded` to manually submit list for state management
     */
    it('paginatedWorkShifts$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.paginatedWorkShifts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.data.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new WorkShiftsLoaded({
            data: [
              createWorkShifts('1'),
              createWorkShifts('2')
            ],
            meta: {}
          })
        );

        list = await readFirst(facade.paginatedWorkShifts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.data.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
