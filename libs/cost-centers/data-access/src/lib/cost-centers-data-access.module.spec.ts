import { TestBed, waitForAsync } from '@angular/core/testing';
import { CostCentersDataAccessModule } from './cost-centers-data-access.module';

describe('CostCentersDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CostCentersDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CostCentersDataAccessModule).toBeDefined();
  });
});
