import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';

import { EmployeesEffects } from './employees.effects';
import { EmployeeService } from '../employee.service';

describe('EmployeesEffects', () => {
  let actions: Observable<any>;
  let effects: EmployeesEffects;
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        EffectsModule.forRoot([])
      ],
      providers: [
        DataPersistence,
        EmployeesEffects,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: { open: () => true } },
        {
          provide: EmployeeService,
          useValue: {
            syncEmployeesByCsvFile: () => true,
            search: query => true
          }
        }
      ]
    });

    effects = TestBed.get(EmployeesEffects);
    service = TestBed.get(EmployeeService);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
