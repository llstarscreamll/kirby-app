import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthorizationUiModule } from './authorization-ui.module';

describe('AuthorizationUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthorizationUiModule).toBeDefined();
  });
});
