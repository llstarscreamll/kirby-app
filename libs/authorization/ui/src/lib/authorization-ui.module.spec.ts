import { async, TestBed } from '@angular/core/testing';
import { AuthorizationUiModule } from './authorization-ui.module';

describe('AuthorizationUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthorizationUiModule).toBeDefined();
  });
});
