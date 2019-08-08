import { async, TestBed } from '@angular/core/testing';
import { NoveltiesDataAccessModule } from './novelties-data-access.module';

describe('NoveltiesDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesDataAccessModule).toBeDefined();
  });
});
