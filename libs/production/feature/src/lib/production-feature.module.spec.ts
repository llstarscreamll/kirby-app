import { async, TestBed } from '@angular/core/testing';
import { ProductionFeatureModule } from './production-feature.module';

describe('ProductionFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProductionFeatureModule],
    }).compileComponents();
  }));

  it('should have a module definition', () => {
    expect(ProductionFeatureModule).toBeDefined();
  });
});
