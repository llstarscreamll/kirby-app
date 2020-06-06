import { async, TestBed } from '@angular/core/testing';
import { CostCentersDataAccessModule } from './cost-centers-data-access.module';

describe('CostCentersDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CostCentersDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CostCentersDataAccessModule).toBeDefined();
  });
});
