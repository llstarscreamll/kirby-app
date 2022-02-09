import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { User } from '@kirby/users/util';
import { ProductionFacade } from '../+state/production.facade';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { AuthFacade } from '@kirby/authentication/data-access';
import { EditProductionLogPage } from './edit-production-log.page';
import { WeighingMachineService } from '../weighing-machine.service';
import { LoadStatus, LocalStorageService, SharedModule } from '@kirby/shared';

describe('EditProductionLogPage', () => {
  let authFacade: AuthFacade;
  let productionFacade: ProductionFacade;
  let component: EditProductionLogPage;
  let fixture: ComponentFixture<EditProductionLogPage>;
  const user = User.fromJson({
    id: 1,
    name: 'John Doe',
    roles: [],
    permissions: [{ name: 'production-logs.create-on-behalf-of-another-person' }],
  });
  const formData = {
    employee_id: 'E1',
    product_id: 'P1',
    machine_id: 'M1',
    customer_id: 'C1',
    batch: 123,
    tare_weight: 10.5,
    gross_weight: 25.2,
    tag: 'InLine',
    tag_updated_at: '2022-02-08T08:11:58.000000Z',
    employee: { id: 'E1', first_name: 'John', last_name: 'Doe' },
    product: { id: 'P1', short_name: 'pencil', internal_code: 'P1-001', name: 'Great Pencil' },
    machine: { id: 'M1', cost_center_id: 'CC1', code: 'M1-001', name: 'pencil machine' },
    customer: { id: 'C1', name: 'John Doe' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, MatAutocompleteModule],
      declarations: [EditProductionLogPage],
      providers: [
        {
          provide: ProductionFacade,
          useValue: {
            products$: of([{ id: 1, name: 'pencil' }]),
            error$: of(null),
            creationStatus$: of(LoadStatus.Empty),
            updateProductionLog: (_) => true,
            isPrinterAvailable: () => false,
            setUpdateStatus: () => false,
            clearSelectedProductionLog: () => true,
          },
        },
        {
          provide: EmployeesFacade,
          useValue: {
            paginatedEmployees$: of([{ id: 1, name: 'EMP 1' }]),
            search: (_) => true,
          },
        },
        {
          provide: AuthFacade,
          useValue: {
            authUser$: of(user),
          },
        },
        {
          provide: WeighingMachineService,
          useValue: {
            isAvailable: false,
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            getItem: () => null,
          },
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            detectChanges: () => null,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductionLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authFacade = TestBed.inject(AuthFacade);
    productionFacade = TestBed.inject(ProductionFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    component.productionLog$ = of({ id: 'A1', ...formData });

    fixture.detectChanges();
    const html = fixture.nativeElement;

    expect(html.querySelector('h1')).toBeTruthy();
    expect(html.querySelector('kirby-api-errors')).toBeTruthy();
    expect(html.querySelector('kirby-production-log-form')).toBeTruthy();
  });
});
