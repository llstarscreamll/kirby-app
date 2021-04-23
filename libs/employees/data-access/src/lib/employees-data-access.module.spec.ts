import { TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeesDataAccessModule } from './employees-data-access.module';

describe('EmployeesDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmployeesDataAccessModule).toBeDefined();
  });
});
