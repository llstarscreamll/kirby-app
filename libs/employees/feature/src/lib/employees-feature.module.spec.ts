import { async, TestBed } from '@angular/core/testing';
import { EmployeesFeatureModule } from './employees-feature.module';

describe('EmployeesFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EmployeesFeatureModule).toBeDefined();
  });
});
