import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { EmployeesEffects } from './employees.effects';
import { LoadEmployees, EmployeesLoaded } from './employees.actions';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('EmployeesEffects', () => {
  let actions: Observable<any>;
  let effects: EmployeesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        DataPersistence,
        EmployeesEffects,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: { open: () => true } },
        { provide: EmployeeService, useValue: { syncEmployeesByCsvFile: () => true } },
      ]
    });

    effects = TestBed.get(EmployeesEffects);
  });

  describe('loadEmployees$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadEmployees() });
      expect(effects.loadEmployees$).toBeObservable(
        hot('-a-|', { a: new EmployeesLoaded([]) })
      );
    });
  });
});
