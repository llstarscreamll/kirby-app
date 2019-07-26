import * as moment from "moment";
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createTimeClockLog } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsTableComponent } from './time-clock-logs-table.component';
import { createNovelty } from '@llstarscreamll/novelties/utils/src';
import { createUser } from '@llstarscreamll/users/util/src';
import { isArray } from 'lodash';

describe('TimeClockLogsTableComponent', () => {
  let template: HTMLDivElement;
  let component: TimeClockLogsTableComponent;
  let fixture: ComponentFixture<TimeClockLogsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockLogsTableComponent]
    }).overrideComponent(TimeClockLogsTableComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
      .compileComponents();
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
      3: 'Turno',
      4: 'H. entrada',
      5: 'H. salida',
      6: 'Novedades',
      7: 'Aprobaciones',
    };

    fixture.detectChanges();

    expect(template.querySelectorAll('table thead tr').length).toBe(1);
    Object.keys(theadRowMap).forEach(key => {
      expect(template.querySelector(`table thead tr:first-child th:nth-child(${key})`).textContent).toContain(theadRowMap[key]);
    });
  });

  it('should display paginated items on table whe data available', () => {
    let tony = createUser(null, 'Tony Iron', 'Stark');
    let steve = createUser(null, 'Steve Captain', 'Rogers');
    let timeClockLog = createTimeClockLog();
    timeClockLog.approvals = [tony, steve];
    timeClockLog.novelties = [
      createNovelty(null, { time_clock_log_id: timeClockLog.id }),
      createNovelty(null, { time_clock_log_id: timeClockLog.id }),
    ];
    timeClockLog.novelties_count = timeClockLog.novelties.length;

    let firstTbodyRowMap;

    component.timeClockLogs = {
      data: [
        timeClockLog,
        createTimeClockLog(),
      ],
      meta: {}
    };

    firstTbodyRowMap = {
      1: timeClockLog.id,
      2: timeClockLog.employee.user.first_name + ' ' + timeClockLog.employee.user.last_name,
      3: timeClockLog.work_shift.name,
      4: moment(timeClockLog.checked_in_at).format('YY-MM-DD HH:mm'),
      5: moment(timeClockLog.checked_out_at).format('YY-MM-DD HH:mm'),
      6: timeClockLog.concatenatedNoveltiesCount,
      7: ['Tony Stark', 'Steve Rogers']
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

});
