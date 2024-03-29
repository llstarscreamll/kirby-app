import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { User } from '@kirby/users/util';
import { ProductionFacade } from '../+state/production.facade';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { AuthFacade } from '@kirby/authentication/data-access';
import { CreateProductionLogPage } from './create-production-log.page';
import { WeighingMachineService } from '../weighing-machine.service';
import { LoadStatus, LocalStorageService, SharedModule } from '@kirby/shared';

describe('CreateProductionLogPage', () => {
  let authFacade: AuthFacade;
  let productionFacade: ProductionFacade;
  let component: CreateProductionLogPage;
  let fixture: ComponentFixture<CreateProductionLogPage>;
  const user = User.fromJson({
    id: 1,
    name: 'John Doe',
    roles: [],
    permissions: [{ name: 'production-logs.create-on-behalf-of-another-person' }],
  });
  const formData = {
    product: { id: 'P1', short_name: 'pencil', name: 'Great Pencil' },
    machine: { id: 'M1', name: 'pencil machine' },
    customer: { id: 'C1', name: 'John Doe' },
    batch: 123,
    tare_weight: 10.5,
    gross_weight: 25.2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, MatAutocompleteModule],
      declarations: [CreateProductionLogPage],
      providers: [
        {
          provide: ProductionFacade,
          useValue: {
            products$: of([{ id: 1, name: 'pencil' }]),
            error$: of(null),
            creationStatus$: of(LoadStatus.Empty),
            createProductionLog: (_) => true,
            isPrinterAvailable: () => false,
            setCreateStatus: () => false,
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

    fixture = TestBed.createComponent(CreateProductionLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authFacade = TestBed.inject(AuthFacade);
    productionFacade = TestBed.inject(ProductionFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    const html = fixture.nativeElement;

    expect(html.querySelector('h1')).toBeTruthy();
    expect(html.querySelector('kirby-api-errors')).toBeTruthy();
    expect(html.querySelector('kirby-production-log-form')).toBeTruthy();
  });
});
