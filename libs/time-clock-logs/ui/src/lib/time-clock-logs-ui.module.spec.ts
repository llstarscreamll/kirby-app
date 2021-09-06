import { TestBed, waitForAsync } from '@angular/core/testing';
import { TimeClockLogsUiModule } from './time-clock-logs-ui.module';

describe('TimeClockLogsUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsUiModule).toBeDefined();
  });
});
