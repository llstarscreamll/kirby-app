import { Router } from '@angular/router';

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
          { provide: MatSnackBar, useValue: { open: () => true } },
          { provide: Router, useValue: {} }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [

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

      store = TestBed.inject(Store);
      facade = TestBed.inject(EmployeesFacade);
    });

    it('should be defined', () => {
      expect(facade).toBeTruthy();
    });
  });
});
