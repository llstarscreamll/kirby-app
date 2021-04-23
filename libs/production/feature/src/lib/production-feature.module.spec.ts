import { TestBed, waitForAsync } from '@angular/core/testing';
import { ProductionFeatureModule } from './production-feature.module';

describe('ProductionFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProductionFeatureModule],
    }).compileComponents();
  }));

  it('should have a module definition', () => {
    expect(ProductionFeatureModule).toBeDefined();
  });
});
