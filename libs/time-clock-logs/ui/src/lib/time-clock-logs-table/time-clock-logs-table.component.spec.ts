import * as moment from "moment";
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createTimeClockLog } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsTableComponent } from './time-clock-logs-table.component';

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
      6: 'Novedades'
    };

    fixture.detectChanges();

    expect(template.querySelectorAll('table thead tr').length).toBe(1);
    Object.keys(theadRowMap).forEach(key => {
      expect(template.querySelector(`table thead tr:first-child th:nth-child(${key})`).textContent).toContain(theadRowMap[key]);
    });
  });

  it('should display paginated items on table whe data available', () => {
    let timeClockLog = createTimeClockLog();
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
      6: timeClockLog.concatenatedNoveltiesCount
    };

    fixture.detectChanges();

    expect(template.querySelectorAll('table tbody tr').length).toBe(2);
    Object.keys(firstTbodyRowMap).forEach(key => {
      expect(template.querySelector(`table tbody tr:first-child td:nth-child(${key})`).textContent).toContain(firstTbodyRowMap[key]);
    });
  });

});
