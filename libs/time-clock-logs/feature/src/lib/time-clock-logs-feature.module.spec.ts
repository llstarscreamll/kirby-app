import { TestBed, waitForAsync } from '@angular/core/testing';
import { TimeClockLogsFeatureModule } from './time-clock-logs-feature.module';

describe('TimeClockLogsFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsFeatureModule).toBeDefined();
  });
});
