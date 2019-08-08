import { async, TestBed } from '@angular/core/testing';
import { NoveltiesUiModule } from './novelties-ui.module';

describe('NoveltiesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoveltiesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NoveltiesUiModule).toBeDefined();
  });
});
