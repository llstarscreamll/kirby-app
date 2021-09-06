import { TestBed, waitForAsync } from '@angular/core/testing';
import { WorkShiftsUiModule } from './work-shifts-ui.module';

describe('WorkShiftsUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WorkShiftsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WorkShiftsUiModule).toBeDefined();
  });
});
