import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthenticationDataAccessModule } from './authentication-data-access.module';

describe('AuthStateModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthenticationDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthenticationDataAccessModule).toBeDefined();
  });
});
