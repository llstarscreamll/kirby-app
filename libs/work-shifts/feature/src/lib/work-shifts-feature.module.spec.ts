import { TestBed, waitForAsync } from '@angular/core/testing';
import { WorkShiftsFeatureModule } from './work-shifts-feature.module';

describe('WorkShiftsFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WorkShiftsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WorkShiftsFeatureModule).toBeDefined();
  });
});
