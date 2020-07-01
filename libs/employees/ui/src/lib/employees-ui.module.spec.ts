import { async, TestBed } from '@angular/core/testing';
import { EmployeesUiModule } from './employees-ui.module';

describe('EmployeesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmployeesUiModule).toBeDefined();
  });
});
