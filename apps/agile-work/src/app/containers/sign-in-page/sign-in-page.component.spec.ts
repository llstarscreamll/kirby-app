import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthFacade } from '../../+state/auth.facade';
import { SignInPageComponent } from './sign-in-page.component';
import { LoginWithCredentials } from '../../+state/auth.actions';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let authFacade: AuthFacade;
  const credentials = { email: 'tony@stark.com', password: 'tony.123' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [SignInPageComponent],
      providers: [AuthFacade],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthFacade);

    spyOn(authFacade, 'loginWithCredentials').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action on onSubmit method', () => {
    component.login(credentials);

    expect(authFacade.loginWithCredentials).toHaveBeenCalledWith(credentials);
  });
});
