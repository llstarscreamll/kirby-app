import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoveltiesUiModule } from './novelties-ui.module';

describe('NoveltiesUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesUiModule).toBeDefined();
  });
});
