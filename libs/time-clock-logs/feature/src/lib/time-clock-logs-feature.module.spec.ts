import { async, TestBed } from '@angular/core/testing';
import { TimeClockLogsFeatureModule } from './time-clock-logs-feature.module';

describe('TimeClockLogsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimeClockLogsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimeClockLogsFeatureModule).toBeDefined();
  });
});
