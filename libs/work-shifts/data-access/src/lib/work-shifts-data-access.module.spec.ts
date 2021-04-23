import { TestBed, waitForAsync } from '@angular/core/testing';
import { WorkShiftsDataAccessModule } from './work-shifts-data-access.module';

describe('WorkShiftsDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WorkShiftsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WorkShiftsDataAccessModule).toBeDefined();
  });
});
