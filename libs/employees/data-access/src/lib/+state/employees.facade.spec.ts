import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeesFacade } from './employees.facade';
import { EmployeeService } from '../employee.service';
import { EmployeesEffects } from './employees.effects';
import {
  EmployeesState,
  initialState,
  employeesReducer
} from './employees.reducer';

interface TestSchema {
  employees: EmployeesState;
}

describe('EmployeesFacade', () => {
  let facade: EmployeesFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('employees', employeesReducer, {
            initialState
          }),
          EffectsModule.forFeature([EmployeesEffects])
        ],
        providers: [
          EmployeesFacade,
          {
            provide: EmployeeService,
            useValue: {
              syncEmployeesByCsvFile: () => true,
              search: query => true
            }
          },
          { provide: MatSnackBar, useValue: { open: () => true } }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot(
            {},
            {
              runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
              }
            }
          ),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(EmployeesFacade);
    });

    it('should be defined', () => {
      expect(facade).toBeTruthy();
    });
  });
});
