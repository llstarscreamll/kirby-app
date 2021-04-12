import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createEmployee } from '@kirby/employees/testing';
import { createWorkShift } from '@kirby/work-shifts/testing';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { EditEmployeePageComponent } from './edit-employee-page.component';
import { LoadStatus } from '@kirby/shared';
import { CostCentersFacade } from '@kirby/cost-centers/data-access';

describe('EditEmployeePageComponent', () => {
  let component: EditEmployeePageComponent;
  let fixture: ComponentFixture<EditEmployeePageComponent>;
  const john = createEmployee('A1', 'John');
  const morningWorkShift = createWorkShift('W1');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeePageComponent],
      providers: [
        {
          provide: EmployeesFacade,
          useValue: {
            selectedEmployee$: of(john),
            updatingStatus$: of(null),
            selectingStatus$: of(null),
            cleanSelected: () => true
          }
        },
        {
          provide: WorkShiftsFacade,
          useValue: {
            getAll$: of([morningWorkShift]),
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
    fixture = TestBed.createComponent(EditEmployeePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    expect(html.querySelector('kirby-employee-form')).toBeTruthy();
  });
});
