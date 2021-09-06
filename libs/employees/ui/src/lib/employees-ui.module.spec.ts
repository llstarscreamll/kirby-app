import { TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeesUiModule } from './employees-ui.module';

describe('EmployeesUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmployeesUiModule).toBeDefined();
  });
});
