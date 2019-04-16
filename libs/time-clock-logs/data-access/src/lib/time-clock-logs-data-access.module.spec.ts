import { async, TestBed } from '@angular/core/testing';
import { TimeClockLogsDataAccessModule } from './time-clock-logs-data-access.module';

describe('TimeClockLogsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsDataAccessModule).toBeDefined();
  });
});
