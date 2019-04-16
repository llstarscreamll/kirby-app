import { async, TestBed } from '@angular/core/testing';
import { TimeClockLogsUiModule } from './time-clock-logs-ui.module';

describe('TimeClockLogsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsUiModule).toBeDefined();
  });
});
