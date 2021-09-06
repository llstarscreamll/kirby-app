import { TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeesFeatureModule } from './employees-feature.module';

describe('EmployeesFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmployeesFeatureModule).toBeDefined();
  });
});
