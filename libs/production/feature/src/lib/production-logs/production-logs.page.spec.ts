import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { emptyPagination, SharedModule } from '@kirby/shared';
import { ProductionLogsPage } from './production-logs.page';
import { ProductionFacade } from '../+state/production.facade';
import { AuthFacade } from '@kirby/authentication/data-access';
import { User } from '@kirby/users/util';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { MatMenuModule } from '@angular/material/menu';

describe('ProductionLogsPage', () => {
  let component: ProductionLogsPage;
  let fixture: ComponentFixture<ProductionLogsPage>;
  const user = User.fromJson({
    id: 1,
    name: 'John Doe',
    roles: [],
    permissions: [{ name: 'production-logs.create-on-behalf-of-another-person' }],
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, ReactiveFormsModule, MatAutocompleteModule, MatMenuModule],
        declarations: [ProductionLogsPage],
        providers: [
          {
            provide: AuthFacade,
            useValue: {
              authUser$: of(user),
            },
          },
          {
            provide: EmployeesFacade,
            useValue: {
              paginatedEmployees$: of(emptyPagination()),
            },
          },
          {
            provide: ProductionFacade,
            useValue: {
              productionLogs$: of([]),
              exportToCsv: (q) => true,
              searchProductionLogs: (q) => true,
            },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
