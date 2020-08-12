import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import { createNovelty } from '@kirby/novelties/testing';
import { createEmployee } from '@kirby/employees/testing';
import { EmployeeInterface } from '@kirby/employees/util';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { NoveltyTypeOperator } from '@kirby/novelty-types/data';
import { ResumeByEmployeesAndNoveltyTypesTableComponent } from './resume-by-employees-and-novelty-types-table.component';

describe('ResumeByEmployeesAndNoveltyTypesTableComponent', () => {
  let template: HTMLDivElement;
  let component: ResumeByEmployeesAndNoveltyTypesTableComponent;
  let fixture: ComponentFixture<ResumeByEmployeesAndNoveltyTypesTableComponent>;
  // test novelty types
  const HA = createNoveltyType('1', {
    code: 'HA',
    name: 'HA',
    operator: NoveltyTypeOperator.Addition,
  });
  const HN = createNoveltyType('2', {
    code: 'HN',
    name: 'HN',
    operator: NoveltyTypeOperator.Addition,
  });
  const CAL = createNoveltyType('3', {
    code: 'CAL',
    name: 'CAL',
    operator: NoveltyTypeOperator.Subtraction,
  });
  const PP = createNoveltyType('4', {
    code: 'PP',
    name: 'PP',
    operator: NoveltyTypeOperator.Subtraction,
  });
  const HNNovelties = [
    createNovelty('N1', {
      novelty_type_id: HN.id,
      novelty_type: null,
      start_at: '1999-01-01 01:00:00',
      end_at: '1999-01-01 02:00:00',
    }),
    createNovelty('N2', {
      novelty_type_id: HN.id,
      novelty_type: null,
      start_at: '1999-01-01 10:00:00',
      end_at: '1999-01-01 12:00:00',
    }),
  ];
  const PPNovelties = [
    createNovelty('N3', {
      novelty_type_id: PP.id,
      novelty_type: null,
      start_at: '1999-01-02 12:00:00',
      end_at: '1999-01-02 13:00:00',
    }),
    createNovelty('N4', {
      novelty_type_id: PP.id,
      novelty_type: null,
      start_at: '1999-01-02 16:00:00',
      end_at: '1999-01-02 20:00:00',
    }),
  ];

  const tonyStark = createEmployee('AAA', {
    novelty_types: [
      { ...HN, novelties: HNNovelties },
      CAL,
      { ...PP, novelties: PPNovelties },
      HA,
    ],
  });

  const steveRogers = createEmployee('AAA', {
    novelty_types: [HN, CAL, PP, HA],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeByEmployeesAndNoveltyTypesTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ResumeByEmployeesAndNoveltyTypesTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ResumeByEmployeesAndNoveltyTypesTableComponent
    );
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table with employees novelties data', () => {
    component.employees = EmployeeInterface.fromJsonList([
      tonyStark,
      steveRogers,
    ]);

    component.showBalanceButton = true;
    fixture.detectChanges();

    // table head
    expect(
      template.querySelector('table thead tr th:first-child').textContent
    ).toContain('Empleado');
    // first the addition novelty types
    expect(template.querySelector('table').textContent).toContain(HA.code);
    expect(
      template.querySelector('table thead tr th:nth-child(3)').textContent
    ).toContain(HN.code);
    // then the subtraction novelty types
    expect(
      template.querySelector('table thead tr th:nth-child(4)').textContent
    ).toContain(CAL.code);
    expect(
      template.querySelector('table thead tr th:nth-child(5)').textContent
    ).toContain(PP.code);
    // total column
    expect(
      template.querySelector('table thead tr th:nth-child(6)').textContent
    ).toContain('Total');
    // actions column
    expect(
      template.querySelector('table thead tr th:nth-child(7)')
    ).toBeTruthy();

    // table body
    expect(
      template.querySelector('table tbody tr:first-child td:first-child')
        .textContent
    ).toContain(`${tonyStark.first_name} ${tonyStark.last_name}`);
    // time measured in hours
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(2)')
        .textContent
    ).toContain('0');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(3)')
        .textContent
    ).toContain('3');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(4)')
        .textContent
    ).toContain('0');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(5)')
        .textContent
    ).toContain('-5');
    expect(
      template.querySelector('table tbody tr:first-child td:nth-child(6)')
        .textContent
    ).toContain('-2');
    expect(
      template.querySelector(
        'table tbody tr:first-child td:nth-child(7) button'
      )
    ).toBeTruthy();

    // second row data
    expect(
      template.querySelector('table tbody tr:last-child td:first-child')
        .textContent
    ).toContain(`${steveRogers.first_name} ${steveRogers.last_name}`);
  });

  it('should not render balance button column when showBalanceButton=false', () => {
    component.employees = EmployeeInterface.fromJsonList([
      tonyStark,
      steveRogers,
    ]);

    component.showBalanceButton = false;
    fixture.detectChanges();

    // actions column
    expect(
      template.querySelector('table thead tr th:nth-child(7)')
    ).toBeFalsy();
    expect(
      template.querySelector(
        'table tbody tr:first-child td:nth-child(7) button'
      )
    ).toBeFalsy();
  });

  it('should disable balance button column when total=0', () => {
    component.employees = EmployeeInterface.fromJsonList([
      steveRogers,
    ]);

    component.showBalanceButton = true;
    fixture.detectChanges();

    expect(
      template.querySelector(
        'table tbody tr:first-child td:nth-child(7) button:disabled'
      )
    ).toBeTruthy();
  });

  it('should emit row data on balance button click', () => {
    component.showBalanceButton = true;
    component.employees = EmployeeInterface.fromJsonList([
      tonyStark,
      steveRogers,
    ]);

    spyOn(component.balance, 'emit');

    fixture.detectChanges();

    const btn: HTMLButtonElement = template.querySelector(
      'table tbody tr:first-child td:last-child button'
    );
    btn.click();

    expect(component.balance.emit).toHaveBeenLastCalledWith(tonyStark);
  });
});
