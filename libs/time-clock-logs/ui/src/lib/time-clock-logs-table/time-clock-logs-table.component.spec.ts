import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from "moment";

import { TimeClockLogsTableComponent } from './time-clock-logs-table.component';
import { createTimeClockLog } from '@llstarscreamll/time-clock-logs/util/src';

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

  it('should display paginated items on table whe data available', () => {
    let timeClockLog;
    let firstRowMap;

    component.timeClockLogs = {
      data: [
        timeClockLog = createTimeClockLog(),
        createTimeClockLog(),
      ],
      meta: {}
    };

    firstRowMap = {
      1: timeClockLog.id,
      2: timeClockLog.employee.user.first_name,
      3: timeClockLog.work_shift.name,
      4: moment(timeClockLog.checked_in_at).format('YY-MM-DD HH:mm'),
      5: moment(timeClockLog.checked_out_at).format('YY-MM-DD HH:mm'),
    };

    fixture.detectChanges();

    expect(template.querySelectorAll('table tbody tr').length).toBe(2);
    Object.keys(firstRowMap).forEach(key => {
      expect(template.querySelector(`table tbody tr:first-child td:nth-child(${key})`).textContent).toContain(firstRowMap[key]);
    });
  });

});
