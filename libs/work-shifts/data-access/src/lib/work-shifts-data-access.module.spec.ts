import { async, TestBed } from '@angular/core/testing';
import { WorkShiftsDataAccessModule } from './work-shifts-data-access.module';

describe('WorkShiftsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WorkShiftsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WorkShiftsDataAccessModule).toBeDefined();
  });
});
