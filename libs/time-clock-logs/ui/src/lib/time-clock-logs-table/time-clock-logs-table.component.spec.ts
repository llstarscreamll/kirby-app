import * as moment from "moment";
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createTimeClockLog } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsTableComponent } from './time-clock-logs-table.component';
import { createNovelty } from '@llstarscreamll/novelties/utils';
import { createUser } from '@llstarscreamll/users/util';
import { isArray } from 'lodash';
import { RouterModule } from '@angular/router';

describe('TimeClockLogsTableComponent', () => {
  let template: HTMLDivElement;
  let component: TimeClockLogsTableComponent;
  let fixture: ComponentFixture<TimeClockLogsTableComponent>;
  const approveButtonSelector = 'table tbody tr:first-child td:last-child .approve';
  const deleteApprovalButtonSelector = 'table tbody tr:first-child td:last-child .delete-approval';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forChild([])],
      declarations: [TimeClockLogsTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(TimeClockLogsTableComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockLogsTableComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default table headers', () => {
    const theadRowMap = {
      1: '#',
      2: 'Empleado',
      3: 'Scc',
      4: 'Turno',
      5: 'H. entrada',
      6: 'H. salida',
      7: 'Novedades',
      8: 'Aprobaciones',
      9: '',
    };

    fixture.detectChanges();

    expect(template.querySelectorAll('table thead tr').length).toBe(1);
    Object.keys(theadRowMap).forEach(key => {
      expect(template.querySelector(`table thead tr:first-child th:nth-child(${key})`).textContent).toContain(theadRowMap[key]);
    });
  });

  it('should display paginated items on table whe data available', () => {
    const tony = createUser(null, 'Tony Iron', 'Stark');
    const steve = createUser(null, 'Steve Captain', 'Rogers');
    const timeClockLog = createTimeClockLog();
    timeClockLog.sub_cost_center = { id: 'scc-1', name: 'SCC One' };
    timeClockLog.approvals = [tony, steve];
    timeClockLog.novelties = [
      createNovelty(null, { time_clock_log_id: timeClockLog.id }),
      createNovelty(null, { time_clock_log_id: timeClockLog.id }),
    ];
    timeClockLog.novelties_count = timeClockLog.novelties.length;

    component.timeClockLogs = {
      data: [
        timeClockLog,
        createTimeClockLog(),
      ],
      meta: {}
    };

    const firstTbodyRowMap = {
      1: timeClockLog.id,
      2: timeClockLog.employee.user.first_name + ' ' + timeClockLog.employee.user.last_name,
      3: timeClockLog.sub_cost_center.name,
      4: timeClockLog.work_shift.name,
      5: moment(timeClockLog.checked_in_at).format('YY-MM-DD HH:mm'),
      6: moment(timeClockLog.checked_out_at).format('YY-MM-DD HH:mm'),
      7: timeClockLog.concatenatedNoveltiesCount,
      8: ['Tony Stark', 'Steve Rogers']
    };

    fixture.detectChanges();

    let cellSelector, result, expectedValue;

    expect(template.querySelectorAll('table tbody tr').length).toBe(2);
    Object.keys(firstTbodyRowMap).forEach(key => {
      cellSelector = `table tbody tr:first-child td:nth-child(${key})`;
      result = template.querySelector(cellSelector).textContent;
      expectedValue = firstTbodyRowMap[key];

      isArray(expectedValue)
        ? expectedValue.forEach(value => expect(result).toContain(value))
        : expect(result).toContain(expectedValue);
    });
  });

  it('should display/hide action buttons when actionButtons has certain values', () => {
    const approver = createUser('a1');
    const firstTimeClockLog = createTimeClockLog();
    firstTimeClockLog.approvals = [approver];
    component.userId = approver.id;
    component.timeClockLogs = {
      data: [firstTimeClockLog, createTimeClockLog(),],
      meta: {}
    };

    const approveButtonSelector = 'table tbody tr:last-child td:last-child .approve';
    const deleteApprovalButtonSelector = 'table tbody tr:first-child td:last-child .delete-approval';

    // show buttons
    component.actionButtons = ['approve', 'delete-approval'];

    fixture.detectChanges();

    expect(template.querySelector(approveButtonSelector)).toBeTruthy();
    expect(template.querySelector(deleteApprovalButtonSelector)).toBeTruthy();

    // hide buttons
    component.actionButtons = [];

    fixture.detectChanges();

    expect(template.querySelector(approveButtonSelector)).toBeFalsy();
    expect(template.querySelector(deleteApprovalButtonSelector)).toBeFalsy();

    // hide buttons
    component.actionButtons = null;

    fixture.detectChanges();

    expect(template.querySelector(approveButtonSelector)).toBeFalsy();
    expect(template.querySelector(deleteApprovalButtonSelector)).toBeFalsy();
  });

  it('should emit values when approve action button is clicked', () => {
    const firstTimeClockLog = createTimeClockLog();
    component.timeClockLogs = {
      data: [firstTimeClockLog, createTimeClockLog(),],
      meta: {}
    };

    spyOn(component.approve, 'emit');
    component.actionButtons = ['approve'];

    fixture.detectChanges();

    const approveButton: HTMLButtonElement = template.querySelector(approveButtonSelector);
    approveButton.click();

    expect(component.approve.emit).toHaveBeenCalledWith(firstTimeClockLog.id);
  });

  it('should emit values when delete-approval action button is clicked', () => {
    const approver = createUser('a1');
    const firstTimeClockLog = createTimeClockLog();
    firstTimeClockLog.approvals = [approver];
    component.userId = approver.id;
    component.timeClockLogs = {
      data: [firstTimeClockLog, createTimeClockLog(),],
      meta: {}
    };

    spyOn(component.deleteApproval, 'emit');
    component.actionButtons = ['delete-approval'];

    fixture.detectChanges();

    const deleteApprovalButton: HTMLButtonElement = template.querySelector(deleteApprovalButtonSelector);
    deleteApprovalButton.click();

    expect(component.deleteApproval.emit).toHaveBeenCalledWith(firstTimeClockLog.id);
  });

  it('should hide approve and show delete-approval button when row is approved by user', () => {
    const approver = createUser('a1');
    const firstTimeClockLog = createTimeClockLog();

    firstTimeClockLog.approvals = [approver];
    component.userId = approver.id;
    component.timeClockLogs = {
      data: [firstTimeClockLog, createTimeClockLog()],
      meta: {}
    };

    const approveButtonSelector = 'table tbody tr:first-child td:last-child .approve';
    const deleteApprovalButtonSelector = 'table tbody tr:first-child td:last-child .delete-approval';

    // show buttons
    component.actionButtons = ['approve', 'delete-approval'];

    fixture.detectChanges();

    expect(template.querySelector(approveButtonSelector)).toBeFalsy(); // user has already approved first row data
    expect(template.querySelector(deleteApprovalButtonSelector)).toBeTruthy(); // user can delete his approval
  });

  it('should show approve and hide delete-approval button when row is not approved by user', () => {
    const approver = createUser('a1');
    const firstTimeClockLog = createTimeClockLog();

    // firstTimeClockLog.approvals = [approver];
    component.userId = approver.id;
    component.timeClockLogs = {
      data: [firstTimeClockLog, createTimeClockLog()],
      meta: {}
    };

    const approveButtonSelector = 'table tbody tr:first-child td:last-child .approve';
    const deleteApprovalButtonSelector = 'table tbody tr:first-child td:last-child .delete-approval';

    // show buttons
    component.actionButtons = ['approve', 'delete-approval'];

    fixture.detectChanges();

    expect(template.querySelector(approveButtonSelector)).toBeTruthy(); // user has not approved first row data
    expect(template.querySelector(deleteApprovalButtonSelector)).toBeFalsy(); // user can't delete approval
  });

});
