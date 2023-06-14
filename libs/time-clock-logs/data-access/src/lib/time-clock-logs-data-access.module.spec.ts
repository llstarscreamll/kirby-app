import { TestBed, waitForAsync } from '@angular/core/testing';
import { TimeClockLogsDataAccessModule } from './time-clock-logs-data-access.module';

describe('TimeClockLogsDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsDataAccessModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsDataAccessModule).toBeDefined();
  });
});
