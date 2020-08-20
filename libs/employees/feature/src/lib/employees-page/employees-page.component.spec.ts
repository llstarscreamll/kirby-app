import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { emptyPagination } from '@kirby/shared';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { createEmployee } from '@kirby/employees/testing';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { EmployeesPageComponent } from './employees-page.component';
import { AuthorizationUiTestModule } from '@kirby/authorization/ui';

describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;
  let employeesFacade: EmployeesFacade;
  // Jane And John as employees
  const John = createEmployee('A1', 'John');
  const Jane = createEmployee('B2', 'Jane');
  const paginatedEmployees = { ...emptyPagination(), data: [John, Jane] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiTestModule],
      declarations: [EmployeesPageComponent],
      providers: [
        {
          provide: EmployeesFacade,
          useValue: {
            paginatedEmployees$: of(paginatedEmployees),
            search: ({}) => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPageComponent);
    component = fixture.componentInstance;
    employeesFacade = TestBed.inject(EmployeesFacade);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call employees facade methods', () => {
    spyOn(employeesFacade, 'search');

    fixture.detectChanges();

    expect(employeesFacade.search).toHaveBeenCalled();
  });

  it('should display employees on table', () => {
    const html: HTMLDivElement = fixture.nativeElement;
    const tableHeadings = ['ID', 'Nombres', 'Apellidos', 'Código', 'Cargo'];

    fixture.detectChanges();

    tableHeadings.forEach((heading, i) =>
      expect(
        html.querySelector(`table thead tr th:nth-child(${i + 1})`).textContent
      ).toContain(heading)
    );

    const tableCellsMap = {
      1: 'id',
      2: 'first_name',
      3: 'last_name',
      4: 'code',
      5: 'position',
    };

    paginatedEmployees.data.forEach((employee, row) => {
      Object.keys(tableCellsMap).forEach((column) => {
        const attribute = tableCellsMap[column];
        const tableCell = html.querySelector(
          `table tbody tr:nth-child(${row + 1}) td:nth-child(${column})`
        );
        expect(tableCell.textContent).toContain(employee[attribute]);
      });
    });
  });
});
