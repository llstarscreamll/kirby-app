import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';

import { EmployeeService } from '../employee.service';
import { EmployeesEffects } from './employees.effects';

describe('EmployeesEffects', () => {
  let actions: Observable<any>;
  let effects: EmployeesEffects;
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      ],
      providers: [
        EmployeesEffects,
        provideMockActions(() => actions),
        { provide: Router, useValue: {} },
        { provide: MatSnackBar, useValue: { open: () => true } },
        {
          provide: EmployeeService,
          useValue: {
            syncEmployeesByCsvFile: () => true,
            search: (query) => true,
          },
        },
      ],
    });

    effects = TestBed.inject(EmployeesEffects);
    service = TestBed.inject(EmployeeService);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
