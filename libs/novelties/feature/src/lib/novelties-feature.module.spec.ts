import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoveltiesFeatureModule } from './novelties-feature.module';

describe('NoveltiesFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesFeatureModule).toBeDefined();
  });
});
