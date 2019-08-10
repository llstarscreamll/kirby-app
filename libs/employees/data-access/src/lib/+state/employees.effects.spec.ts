import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { DataPersistence } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed, async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';

import { EmployeesEffects } from './employees.effects';
import { EmployeeService } from '../employee.service';
import { SearchEmployees, SearchEmployeesOk } from './employees.actions';

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
      actions = hot('-a-|', { a: new SearchEmployees() });
      expect(effects.loadEmployees$).toBeObservable(
        hot('-a-|', { a: new SearchEmployeesOk([]) })
      );
    });
  });
});
