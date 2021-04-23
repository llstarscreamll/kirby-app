import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoveltiesDataAccessModule } from './novelties-data-access.module';

describe('NoveltiesDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesDataAccessModule).toBeDefined();
  });
});
