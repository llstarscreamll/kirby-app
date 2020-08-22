import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { CostCentersFacade } from '@kirby/cost-centers/data-access';
import { CreateEmployeePageComponent } from './create-employee-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateEmployeePageComponent', () => {
  let component: CreateEmployeePageComponent;
  let fixture: ComponentFixture<CreateEmployeePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeePageComponent],
      providers: [
        {
          provide: EmployeesFacade,
          useValue: {
            creatingStatus$: of(null),
            create: (data) => true
          }
        },
        {
          provide: WorkShiftsFacade,
          useValue: {
            getAll$: of([]),
            search: query => query
          }
        },
        {
          provide: CostCentersFacade,
          useValue: {
            paginatedList$: of([]),
            search: query => query
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    expect(html.querySelector('kirby-employee-form')).toBeTruthy();
    expect(html.querySelector('kirby-api-errors')).toBeTruthy();
  });
});
