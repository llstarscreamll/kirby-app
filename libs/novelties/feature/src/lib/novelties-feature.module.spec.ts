import { async, TestBed } from '@angular/core/testing';
import { NoveltiesFeatureModule } from './novelties-feature.module';

describe('NoveltiesFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesFeatureModule).toBeDefined();
  });
});
