import { async, TestBed } from '@angular/core/testing';
import { WorkShiftsFeatureModule } from './work-shifts-feature.module';

describe('WorkShiftsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WorkShiftsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WorkShiftsFeatureModule).toBeDefined();
  });
});
